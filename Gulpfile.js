const gulp = require('gulp');
const runSequence = require('run-sequence');
const del = require('del');
const file = require('gulp-file');
const shell = require('gulp-shell');
const ghPages = require('gulp-gh-pages');
const sass = require('gulp-sass');
const args = require('yargs').argv;
const replace = require('gulp-replace');
const gulpIf = require('gulp-if');
const hash = require('gulp-hash-src');
const bump = require('gulp-bump');
const path = require('path');
const run = require('gulp-run');

// const electron = require('gulp-atom-electron');
// const zip = require('gulp-vinyl-zip');

const files = {
    dist: './dist',
    js: './src',
    static: ['./www/**/*', './config.xml', './electron.js', '!./www/**/*.scss'],
    sass: './styles/*.scss',
    androidApk: './platforms/android/build/outputs/apk',
    unalignedApk: './platforms/android/build/outputs/apk/android-release-unaligned.apk',
    alignedApk: './platforms/android/build/outputs/apk/android-release-aligned.apk',
    zipAligned: '/Users/nuru/Library/Android/sdk/build-tools/23.0.3/zipalign', // Note the path to the zipalign on your pc
    keyPassword: '****', // make sure you don't push the correct password here to github. Edit password before running task 
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
    gulp.watch('./www/**/*.scss', ['styles'])
);

gulp.task('js', () =>
    gulp.src(files.js)
        .pipe(shell('webpack --config ./webpack.config.js'))
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

gulp.task('deploy', ['build'], () =>
    gulp.src(files.dist + '/**/*')
        .pipe(file('CNAME', 'app.binary.com'))
        .pipe(ghPages())
);

gulp.task('deploy-test', ['build'], () =>
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

gulp.task('android', () =>
    gulp.src(path.resolve(__dirname) + 'www')
        .pipe(cordovaCreate())
        .pipe(cordovaPlugin('org.apache.cordova.dialogs'))
        .pipe(cordovaBuildAndroid({
            release: true,
            storeFile: path.resolve(__dirname) + '/tick-trade-key.keystore', // make sure you have this file in your home folder
            storePassword: files.keyPassword,
            keyPassword: files.keyPassword,
            keyAlias: 'TickTrade' }))
        .pipe(gulp.dest(files.androidApk))
);

gulp.task('androidAligned', ['android'], () =>
    run(files.zipAligned + ' -v 4 ' + files.unalignedApk + ' ' + files.alignedApk).exec()
);

gulp.task('ios', () =>
    gulp.src('dist')
        .pipe(cordovaCreate())
        .pipe(cordovaPlugin('org.apache.cordova.dialogs'))
        .pipe(cordovaBuildIos())
);
