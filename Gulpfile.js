const gulp = require('gulp');
const runSequence = require('run-sequence');
const del = require('del');
const file = require('gulp-file');
const shell = require('gulp-shell');
const ghPages = require('gulp-gh-pages');
const sass = require('gulp-sass');
const rev = require('gulp-rev');
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
        .pipe(rev())
        .pipe(gulp.dest(files.dist))
);

gulp.task('styles:watch', () =>
    gulp.watch('./www/**/*.scss', ['styles'])
);

gulp.task('js', () =>
    gulp.src(files.js)
        .pipe(shell('webpack --config ./webpack.config.js'))
        .pipe(rev())
        .pipe(gulp.dest(files.dist))
);

gulp.task('build', callback =>
    runSequence('cleanup', ['styles', 'static', 'js'], callback)
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
