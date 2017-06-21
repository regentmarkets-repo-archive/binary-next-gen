const gulp = require('gulp');
const runSequence = require('run-sequence');
const del = require('del');
const file = require('gulp-file');
const ghPages = require('gulp-gh-pages');
const sass = require('gulp-sass');
const args = require('yargs').argv;
const replace = require('gulp-replace');
const gulpIf = require('gulp-if');
const hash = require('gulp-hash-src');
const bump = require('gulp-bump');
const path = require('path');
const run = require('gulp-run');

const electron = require('gulp-atom-electron');
const zip = require('gulp-vinyl-zip');

const files = {
    dist: '../dist',
    js: '../src',
    static: ['../www/**/*', '../config.xml', '../electron.js', '!../www/**/*.scss'],
    sass: '../styles/*.scss',
};

const tools = {
    androidApk: '../platforms/android/build/outputs/apk',
    unalignedApk: '../platforms/android/build/outputs/apk/android-release-unaligned.apk',
    alignedApk: '../platforms/android/build/outputs/apk/android-release-aligned.apk',
    zipAlign: path.join(process.env.ANDROID_HOME || '/Applications/ADT/sdk', '/build-tools/23.0.3/zipalign'),
};

process.env.NODE_ENV = 'production';

gulp.task('cleanup', callback =>
    del([files.dist], { force: true }, callback)
);

gulp.task('static', () =>
    gulp.src(files.static)
        .pipe(gulp.dest(files.dist))
);

gulp.task('styles', () =>
    gulp.src(files.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(files.dist))
);

gulp.task('styles:watch', () =>
    gulp.watch('../www/**/*.scss', ['styles'])
);

// Handle general error
function errorHandler (error) {
  console.log(error.toString());
  this.emit('end');
}

gulp.task('js', () =>
    gulp.src(files.js)
        .pipe(run('(cd ../ && webpack --config ./webpack.config.js)'))
            .on('error', errorHandler)
        .pipe(gulp.dest(files.dist))
);

gulp.task('bump', () =>
    gulp.src(files.js + '/config.js')
        .pipe(bump())
        .pipe(files.js + '/config.js')
);

gulp.task('hash', () =>
    gulp.src(files.dist + '/index.html')
        .pipe(hash({
            build_dir: files.dist,
            src_path: files.dist,
            query_name: '',
            hash_len: 10,
        }))
        .pipe(gulp.dest(files.dist))
);

gulp.task('build', callback =>
    runSequence('cleanup', 'js', ['styles', 'static'], 'hash', callback)
);

// gulp.task('download-electron', () =>
//     electron.dest('./release', { version: '0.34.3', platform: 'win32' })
// );

// gulp.task('electron', ['download-electron'], () =>
//     gulp.src(files.dist + '/**')
//         .pipe(electron({ version: '0.34.3', platform: 'win32' }))
//         .pipe(zip.dest('./binary-app.zip'))
// );

gulp.task('deploy-prod', ['build'], () =>
    gulp.src(files.dist + '/**/*')
        .pipe(file('CNAME', 'app.binary.com'))
        .pipe(ghPages({
            remoteUrl: 'https://' + process.env.GIT_KEY + '@github.com/binary-com/binary-next-gen'
        }))
);

gulp.task('deploy-beta', ['build'], () =>
    gulp.src(files.dist + '/**/*')
        .pipe(gulp.dest(files.dist + '/beta'))
        .pipe(ghPages({
            remoteUrl: 'https://' + process.env.GIT_KEY + '@github.com/binary-com/binary-next-gen'
        }))
);

gulp.task('codepush:android')
    gulp.src(path.resolve(__dirname) + './www/**')
        .pipe(run('cordova build android'))
        .pipe(run('code-push release-cordova binary-next-gen-android android'))

gulp.task('codepush:ios')
    gulp.src(path.resolve(__dirname) + './www/**')
        .pipe(run('cordova build ios'))
        .pipe(run('code-push release-cordova binary-next-gen-ios ios'))

gulp.task('deploy&codepush', (done) => {
    runSequence('deploy-prod', ['codepush:ios', 'codepush:android'], () => {
        console.log('Deploying....')
    })
});

gulp.task('deploy:test', ['build'], () =>
    gulp.src(files.dist + '/**/*')
        .pipe(gulpIf(args.appId, replace(
            /window\.BinaryBoot\.appId = window\.cordova \? 1006 : 1001;/,
            'window.BinaryBoot.appId = ' + args.appId + ';',
            { skipBinary: true }
            )
        ))
        .pipe(ghPages())
);

const cordovaCreate = require('gulp-cordova-create');
const cordovaPlugin = require('gulp-cordova-plugin');
const cordovaBuildAndroid = require('gulp-cordova-build-android');
const cordovaBuildIos = require('gulp-cordova-build-ios');

gulp.task('android', () => {
    const keyStorePassword = require('./keystore.json').password;

    return gulp.src(path.resolve(__dirname) + 'www')
        .pipe(cordovaCreate())
        .pipe(cordovaPlugin('org.apache.cordova.dialogs'))
        .pipe(cordovaBuildAndroid({
            release: true,
            storeFile: path.resolve(__dirname) + '/tick-trade-key.keystore', // make sure you have this file in your home folder
            storePassword: keyStorePassword,
            keyPassword: keyStorePassword,
            keyAlias: 'TickTrade' }))
        .pipe(gulp.dest(files.androidApk))
});

gulp.task('android:release', ['android'], () =>
    run(tools.zipAlign + ' -v 4 ' + tools.unalignedApk + ' ' + tools.alignedApk).exec()
);

gulp.task('xcode:clean', () =>
    run('xcodebuild clean -project ../platforms/ios/Binary.com.xcodeproj -configuration Release -alltargets')
        .exec().pipe(gulp.dest('output'))
);

gulp.task('xcode:archive', () =>
    run('xcodebuild archive -project ../platforms/ios/Binary.com.xcodeproj -scheme Binary.com -archivePath ./platforms/ios/build/Binary.com.xcarchive')
        .exec().pipe(gulp.dest('output'))
);

gulp.task('xcode:ipa', () =>
    run('xcodebuild -exportArchive -exportFormat ipa -archivePath ../platforms/ios/build/Binary.com.xcarchive -exportPath ./platforms/ios/build/Binary.com.ipa -exportProvisioningProfile app.binary.com')
        .exec().pipe(gulp.dest('output'))
);

gulp.task('ios:release', (done) => {
    runSequence('ios', 'xcode:clean', 'xcode:archive', 'xcode:ipa', () => {
        console.log('Run something else');
        done();
    });
});

gulp.task('ios', () =>
    gulp.src(path.resolve(__dirname) + 'www')
        .pipe(cordovaCreate())
        .pipe(cordovaPlugin('org.apache.cordova.dialogs'))
        .pipe(cordovaBuildIos())
        .pipe(gulp.dest('./platform/ios/www'))
);

gulp.task('mobile:release', (done) => {
    runSequence('android:release', 'ios:release', () => {
        onsole.log('Run something else');
        done();
    });
});
