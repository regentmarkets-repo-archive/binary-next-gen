const gulp = require('gulp');
const file = require('gulp-file');
const webpack = require('gulp-webpack');
const ghPages = require('gulp-gh-pages');
// const sass = require('gulp-sass');

const files = {
    dist: 'dist',
    js: 'src',
    static: 'public/**/*',
    sass: 'public/styles.sass',
};

process.env.NODE_ENV = 'production';

gulp.task('static', () =>
    gulp.src(files.static)
        .pipe(gulp.dest(files.dist))
);

gulp.task('styles', () =>
    gulp.src(files.sass)
        .sass()
        .pipe(gulp.dest('dist'))
);

gulp.task('js', () =>
    gulp.src(files.js)
        .pipe(webpack(require('./webpack.config.dev.js')))
        .pipe(gulp.dest(files.dist))
);

gulp.task('deploy', ['static'], () =>
    gulp.src('./dist/**/*')
        .pipe(file('CNAME', 'app.binary.com'))
        .pipe(ghPages())
);
