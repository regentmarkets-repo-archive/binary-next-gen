const gulp = require('gulp');
const runSequence = require('run-sequence');
const del = require('del');
const file = require('gulp-file');
const shell = require('gulp-shell');
const ghPages = require('gulp-gh-pages');
const electron = require('gulp-atom-electron');
const zip = require('gulp-vinyl-zip');
const po2json = require('gulp-po2json');
const rename = require('gulp-rename');
const jsonTransform = require('gulp-json-transform');
const through = require('through2');

const files = {
    dist: '../dist',
    js: '../src',
    static: ['../public/**/*', './config.xml', './electron.js'],
    sass: 'public/styles.sass',
    translations: './translations',
    jsons: './translations/json',
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

gulp.task('po2json', () =>
    gulp.src(files.translations + '/*.po')
        .pipe(po2json())
        .pipe(gulp.dest(files.jsons))
);

gulp.task('json2js', () =>
    gulp.src(files.jsons + '/*.json')
        .pipe(jsonTransform(json => {
            const jsonString = JSON.stringify(json, null, 4);
            return 'export default ' + jsonString;
        }))
        .pipe(rename(path => {
            path.dirname = '';
            path.extname = '.js';
        }))
        .pipe(gulp.dest(files.js + '/_constants/po/'))
);

gulp.task('update-translation', callback =>
    runSequence('po2json', 'json2js', callback)
);

gulp.task('deploy', ['build'], () =>
    gulp.src(files.dist + '/**/*')
        .pipe(file('CNAME', 'app.binary.com'))
        .pipe(ghPages())
);
