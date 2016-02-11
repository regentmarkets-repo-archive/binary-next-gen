const gulp = require('gulp');
const runSequence = require('run-sequence');
const del = require('del');
const file = require('gulp-file');
const shell = require('gulp-shell');
const ghPages = require('gulp-gh-pages');
// const sass = require('gulp-sass');
const electron = require('gulp-atom-electron');
const zip = require('gulp-vinyl-zip');

const files = {
    dist: '../dist',
    js: '../src',
    static: ['../public/**/*', './config.xml', './electron.js'],
    sass: 'public/styles.sass',
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
        .pipe(sass())
        .pipe(gulp.dest('dist'))
);

gulp.task('js', () =>
    gulp.src(files.js)
        .pipe(shell('webpack --config ./webpack.config.prod.js', { cwd: '..'}))
        .pipe(gulp.dest(files.dist))
);

gulp.task('build', callback =>
    runSequence('cleanup', ['static', 'js'], callback)
);

gulp.task('download-electron', () =>
    electron.dest('./release', { version: '0.34.3', platform: 'win32' })
);

gulp.task('electron', ['download-electron'], () =>
    gulp.src(files.dist + '/**')
        .pipe(electron({ version: '0.34.3', platform: 'win32' }))
        .pipe(zip.dest('./binary-app.zip'))
);

gulp.task('deploy', ['build'], () =>
    gulp.src(files.dist + '/**/*')
        .pipe(file('CNAME', 'app.binary.com'))
        .pipe(ghPages())
);
