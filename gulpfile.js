const gulp = require('gulp');
const runSequence = require('run-sequence');
const del = require('del');
const file = require('gulp-file');
const shell = require('gulp-shell')
const ghPages = require('gulp-gh-pages');
// const sass = require('gulp-sass');

const files = {
    dist: 'dist',
    js: 'src',
    static: 'public/**/*',
    sass: 'public/styles.sass',
};

process.env.NODE_ENV = 'production';

gulp.task('cleanup', callback =>
    del([files.dist], callback)
);

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
        .pipe(shell('webpack --config ./webpack.config.prod.js'))
        .pipe(gulp.dest(files.dist))
);

gulp.task('build', callback =>
    runSequence('cleanup', ['static', 'js'], callback)
);

gulp.task('deploy', ['build'], () =>
    gulp.src('./dist/**/*')
        .pipe(file('CNAME', 'app.binary.com'))
        .pipe(ghPages())
);

gulp.task('phonegap', () =>
    gulp.src('./dist/**/*')
        .pipe(ghPages({ branch: 'phonegap' }))
);
