const gulp = require('gulp');
const runSequence = require('run-sequence');
const po2json = require('gulp-po2json');
const rename = require('gulp-rename');
const jsonTransform = require('gulp-json-transform');

const files = {
    js: './src',
    translations: './build/translations',
    jsons: './build/translations/json',
};

process.env.NODE_ENV = 'production';

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

gulp.task('update-translation', () =>
    gulp.src(files.translations + '/*.po')
        .pipe(po2json())
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
