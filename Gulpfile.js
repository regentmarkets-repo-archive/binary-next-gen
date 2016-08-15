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

// const electron = require('gulp-atom-electron');
// const zip = require('gulp-vinyl-zip');

const files = {
    dist: './dist',
    js: './src',
    static: ['./www/**/*', './config.xml', './electron.js', '!./www/**/*.scss'],
    sass: './styles/*.scss',
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
    gulp.src('dist')
        .pipe(cordovaCreate())
        .pipe(cordovaPlugin('org.apache.cordova.dialogs'))
        .pipe(cordovaBuildAndroid({ release: true, storeFile: '/Path/to/key.keystore', keyAlias: 'my_alias' }))
        .pipe(gulp.dest('apk'))
);

gulp.task('ios', () =>
    gulp.src('dist')
        .pipe(cordovaCreate())
        .pipe(cordovaPlugin('org.apache.cordova.dialogs'))
        .pipe(cordovaBuildIos())
);
