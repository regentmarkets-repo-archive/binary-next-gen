const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const exec = require('child_process').exec;
//const minify = require('gulp-minify-css'); // to create .min.css optional
const gutil = require('gulp-util');

gulp.task('styles', () => {
    gulp.src('public/sass/*.scss')
        .pipe(concat('build.scss').on('error', () => concat.logError))
        .pipe(sass().on('error', () => sass.logError))
        //.pipe(minify()) //to minify or create minify version
        .pipe(gulp.dest('public/css/'));
});

gulp.task('express', (done) => {
    gutil.log('starting express server');
    exec('node server.js', (err) => {
        gutil.log('gulp could not start express server', err);
        done(err);
    });
    gutil.log('Listening at http://localhost:3000');
    done();
});

gulp.task('watch', (done) => {
    gulp
        .watch('public/sass/*.scss', ['styles'])
        .on('change', (event) => {
            gutil.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        })
        .on('error', (err) => {
            gutil.log('Gulp error watching sass', err);
            done(err);
        })
        .on('end', () => {
            gutil.log('it has ended');
            done();
        });
});

gulp.task('default', ['watch', 'express']);


