const gulp = require('gulp');
const ghPages = require('gulp-gh-pages');
const sass = require('gulp-sass');

const files = {
    dist: 'dist',
    static: 'public/**/*',
    sass: 'public/styles.sass'
};

process.env.NODE_ENV = 'production';

gulp.task('static', () => gulp.src(files.static).pipe(gulp.dest(files.dist)));

gulp.task('sass', () => sass(file.sass).pipe(gulp.dest('dist')));

gulp.task('deploy', () => gulp.src('./dist/**/*').pipe(ghPages()));

gulp.task('default', () => {

});
