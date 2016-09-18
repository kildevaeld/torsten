'use strict';

const gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    nib = require('nib'),
    rename = require('gulp-rename');

/*gulp.task('build:copy', () => {
    return gulp.src('./src/images/*.{png,gif}')
    .pipe(gulp.dest('dist/images'));
})*/

gulp.task('gui:styles', function() {
    return gulp.src('./src/gui/styles/index.styl')
        .pipe(stylus({
            use: nib(),
            url: {
                name: 'embedurl',
                paths: [process.cwd() + '/src/gui/styles'],
                limit: false
            }
        }))
        .pipe(rename('file-gallery.css'))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('gui:styles:watch', function() {
    gulp.watch('./src/gui/styles/*.styl', ['gui:styles']);
});