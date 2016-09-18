'use strict';

const gulp = require('gulp'),
    es = require('event-stream'),
    fs = require('fs');

gulp.task('gui:templates', (done) => {
    
    var output = [];
    var templates = {};
    gulp.src('./src/gui/templates/**/*.html')
    .pipe(es.map((file, callback) => {
        let rel = file.relative.substr(0, file.relative.lastIndexOf('.'));
        let str = file.contents.toString();
         
        let name = file.relative.substr(0, file.relative.lastIndexOf("."));
        
		    str = str.replace( /&apos;/g, "'" ).replace( /&amp;/g, "&" ).replace( /&gt;/g, ">" ).replace( /&lt;/g, "<" ).replace( /&quot;/g, '"' );
        
        templates[name] = str.replace(/\s{2,}/g, '  ');
        
        return callback(null, file);
    }))
    .pipe(es.wait(() => {
      output.push("export default " + JSON.stringify(templates, null, 2));
      return fs.writeFile('./src/gui/templates/index.ts', output.join('\n'), done)
      
    }));
    
});

gulp.task('gui:templates:watch', () => {
    return gulp.watch('./src/gui/templates/**/*.html', ['gui:templates']);
})