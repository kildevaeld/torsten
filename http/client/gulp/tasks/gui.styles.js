'use strict';

const gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    nib = require('nib'),
    rename = require('gulp-rename'),
    request = require('request'),
    gunzip = require('gulp-gunzip'),
    untar = require('gulp-untar2'),
    source = require('vinyl-source-stream'),
    unzip = require('gulp-unzip'),
    imagemin = require('gulp-imagemin'),
    spritesmith = require('gulp.spritesmith'),
    merge = require('merge2'),
    buffer = require('vinyl-buffer'),
    fs = require('fs'),
    Path = require('path');
/*gulp.task('build:copy', () => {
    return gulp.src('./src/images/*.{png,gif}')
    .pipe(gulp.dest('dist/images'));
})*/
const URL = 'https://storage.googleapis.com/google-code-archive-downloads/v2/code.google.com/faenza-icon-theme/faenza-icon-theme_1.3.zip'
gulp.task('gui:styles:mime:download', function () {

    return request.get(URL)
        .pipe(source('faenza.tar.gz'))
        //.pipe(gunzip())
        //.pipe(untar())
        .pipe(unzip())
        .pipe(gulp.dest('mimetypes'))

});

gulp.task('gui:styles:mime:unzip', function () {

    return gulp.src('./mimetypes/Faenza.tar.gz')
        .pipe(gunzip())
        .pipe(untar())
        .pipe(gulp.dest('mimetypes/icons'))
});

gulp.task('gui:styles:mime', () => {
    let files = [
        'mimetypes/icons/Faenza/mimetypes/96/*.png',
        'mimetypes/icons/Faenza/places/96/folder.png'
    ]   
    console.log(Path.resolve(__dirname, "../stylus.template.hbs"))
    var spriteData = gulp.src(files).pipe(spritesmith({
        imgName: 'mimetypes.png',
        cssName: 'mimetypes.styl',
        cssTemplate: Path.resolve(__dirname, "../stylus.template.hbs"),
        cssVarMap: (s) => {
            s.name = s.name.replace(/\+/g,'p')
        }
    }));

    // Pipe image stream through image optimizer and onto disk
    var imgStream = spriteData.img
        // DEV: We must buffer our stream into a Buffer for `imagemin`
        .pipe(buffer())
        .pipe(imagemin())
        .pipe(gulp.dest('src/gui/styles/images'));

    // Pipe CSS stream through CSS optimizer and onto disk
    var cssStream = spriteData.css
        //.pipe(csso())
        .pipe(gulp.dest('src/gui/styles'));

    // Return a merged stream to handle both `end` events
    return merge(imgStream, cssStream);
})

gulp.task('gui:styles', function () {
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

gulp.task('gui:styles:watch', function () {
    gulp.watch('./src/gui/styles/*.styl', ['gui:styles']);
});