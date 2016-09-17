'use strict';

const gulp = require('gulp');

gulp.task('default', ['client:default', 'gui:default'])

gulp.task('watch', ['client:watch', 'gui:watch'])