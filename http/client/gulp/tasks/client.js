
const gulp = require('gulp'),
    wpstream = require('webpack-stream'),
    babel = require('babel-loader'),
    webpack = require('webpack'),
    merge = require('merge2'),
    tsc = require('gulp-typescript');

var JsonpTemplatePlugin = require('../../node_modules/webpack/lib/JsonpTemplatePlugin');
var FunctionModulePlugin = require('../../node_modules/webpack/lib/FunctionModulePlugin');
var NodeTargetPlugin = require('../../node_modules/webpack/lib/node/NodeTargetPlugin');
var NodeTemplatePlugin = require('../../node_modules/webpack/lib/node/NodeTemplatePlugin');
var LoaderTargetPlugin = require('../../node_modules/webpack/lib/LoaderTargetPlugin');

var webpackOutput = {
    library: 'torsten',
    libraryTarget: 'umd',

    filename: 'torsten-client.js'
};

var webpackNode = {
    // do not include poly fills...
    console: false,
    process: false,
    global: false,
    buffer: false,
    __filename: false,
    __dirname: true
};


gulp.task('client:webpack', ['client:typescript'], () => {
    return gulp.src('lib/index.js')
        .pipe(wpstream({
            output: webpackOutput,
            target: function (compiler) {
                compiler.apply(
                    new JsonpTemplatePlugin(webpackOutput),
                    new FunctionModulePlugin(webpackOutput),
                    new NodeTemplatePlugin(webpackOutput),
                    new NodeTargetPlugin(webpackNode),
                    new LoaderTargetPlugin('web')
                );
            },
            node: webpackNode,
            module: {
                loaders: [
                    { test: /\.json/, loader: 'json-loader' },
                    { test: /stream.js$/, loader: 'ignore-loader' },
                    { test: /\.js$/, loader: 'babel', query: { presets: ['es2015'] } },

                ]
            },

            externals: {
                "orange": "orange",
                "orange.request": ['orange', 'request']
            }
        })).pipe(gulp.dest('dist'))
});

gulp.task('client:webpack:bundle', ['client:typescript'], () => {
    return gulp.src('lib/index.js')
        .pipe(wpstream({
            output: {
                library: 'torsten',
                libraryTarget: 'umd',

                filename: 'torsten-client.bundle.js'
            },
            target: function (compiler) {
                compiler.apply(
                    new JsonpTemplatePlugin(webpackOutput),
                    new FunctionModulePlugin(webpackOutput),
                    new NodeTemplatePlugin(webpackOutput),
                    new NodeTargetPlugin(webpackNode),
                    new LoaderTargetPlugin('web')
                );
            },
            module: {
                loaders: [
                    { test: /\.json/, loader: 'json-loader' },
                    { test: /stream.js$/, loader: 'ignore-loader' },
                    
                    { test: /\.js$/, loader: 'babel', query: { presets: ['es2015'] } },

                ]
            }
        })).pipe(gulp.dest('dist'))
});

gulp.task('client:typescript', () => {
    var project = tsc.createProject('tsconfig.json')

    let p = project.src()
        .pipe(tsc(project))
        

    return merge([
        p.js.pipe(gulp.dest('lib')),
        p.dts.pipe(gulp.dest('lib'))
    ]);

})

gulp.task('client:default', ['client:webpack', 'client:webpack:bundle'])


gulp.task('client:watch', () => {
    gulp.watch('./src/*.ts', ['client:webpack:bundle', 'client:webpack'])
})