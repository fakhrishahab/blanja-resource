'use strict';
// Import Gulp Library and Environment Config for Running Task
import gulp from 'gulp';
import './config/config.js';
import env from './config/env.js';
import flatmap from 'gulp-flatmap';
import jsMinify from 'gulp-minify';
import path from 'path';
import concat from 'gulp-concat';
import gutil from 'gulp-util';
import del from 'del';
import uglify from 'gulp-uglify';
import connect from 'gulp-connect';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import browserify from 'browserify';
import eslint from 'gulp-eslint';
import cache from 'gulp-cache';
import plumber from 'gulp-plumber';
import size from 'gulp-size';
import chalk from 'chalk';
import logger from 'gulp-logger';
import cssnano from 'gulp-cssnano';
import create_server from './server';
import transform from 'vinyl-transform';
import webpack from 'webpack-stream';

// console.log(env.build);

let taskList = [
	'clean',
	'clear',
	'linting',
	'global_server',
	// 'create_server',
	// 'template_server',
	'commons_scripts',
	'modular_scripts',
	'pages_scripts',
	'fonts',
	'scss',
	'vendors',
	'images',
	'watch'
];

if(isProd){
	taskList = [
		'clear',
		'global_server',
		'commons_scripts',
		'modular_scripts',
		'pages_scripts',
		'fonts',
		'scss',
		'vendors',
		'images'
	];
}

let cors = function(req, res, next){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', '*');
	next();
};

// Check apps environment 
const isProd = process.env.NODE_ENV === "production";
// console.log(isProd);

gulp.task('clean', function(){
	del.sync('dist');
});

gulp.task('clear', function(done){
	return cache.clearAll(done);
});

gulp.task('linting', function(){
	gutil.log(chalk.blue('STARTED LINTING TASK'));
	return gulp.src(env.build.devPath+'/scripts/**/*.js')
		.pipe(eslint())
		.pipe(eslint.format('codeframe'))
		.pipe(eslint.results(results => {
	    	// Called once for all ESLint results. 
	        console.log(`Total Results: ${results.length}`);
	        console.log(`Total Warnings: ${results.warningCount}`);
	        console.log(`Total Errors: ${results.errorCount}`);
	    }))
	    .pipe(logger({
			before: 'STARTED LINTING',
			after: 'FINISH LINTING'
		}))
		.pipe(eslint.failAfterError())
});

gulp.task('commons_scripts', ['clear', 'modular_scripts'], function(){
	var browserified = transform(function(filename) {
	    var b = browserify(filename);
	    return b.bundle();
	});
	return gulp.src(env.build.devPath+'/scripts/commons/*.js')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(webpack({
			module:{
				rules:[
					{
						test: /\.js?$/,
						loader: 'babel-loader',
						query: {
							presets: ['es2015']
						}
					},
				]
			},
			output: {
				filename: "bundle.js"
			}
		}))
		.pipe(isProd ? uglify({
			mangle: true,
			sourceMap: false,
			ie8: true,
			compress: true
		}) : gutil.noop())
		.pipe(size({gzip: env.build.compressionGzip}))
		.pipe(sourcemaps.write())
		.pipe(logger({
			before: 'STARTED COMPILING COMMON SCRIPTS',
			after: 'FINISH COMPILING COMMON SCRIPTS'
		}))
		.pipe(gulp.dest(env.build.distPath+'/scripts/commons'))
		// .pipe(isProd ? connect.reload() : gutil.noop())
});

gulp.task('modular_scripts', ['clear'], function(){
	var browserified = transform(function(filename) {
	    var b = browserify(filename);
	    return b.bundle();
	});
	return gulp.src(env.build.devPath+'/scripts/components/{*,}')
		.pipe(flatmap(function(stream, dir){
			return gulp.src(dir.path + '/*.js')
				.pipe(plumber())
				.pipe(sourcemaps.init())
				.pipe(webpack({
					module:{
						rules:[
							{
								test: /\.js?$/,
								loader: 'babel-loader',
								query: {
									presets: ['es2015']
								}
							},
						]
					},
					output: {
						filename: "bundle.js"
					}
				}))
				// .pipe(concat('modules.js'))
				.pipe(isProd ? uglify({
					mangle: true,
					sourceMap: false,
					ie8: true,
					compress: true
				}) : gutil.noop())
				.pipe(size({gzip: env.build.compressionGzip}))
				.pipe(sourcemaps.write())
				.pipe(logger({
					before: 'STARTED COMPILING MODULAR SCRIPTS',
					after: 'FINISH COMPILING MODULAR SCRIPTS'
				}))
				.pipe(gulp.dest(env.build.distPath+'/scripts/components/' + path.relative(dir.base, dir.path)))
		}))
		// .pipe(isProd ? connect.reload() : gutil.noop())
});

gulp.task('pages_scripts', ['clear'], function(){
	var browserified = transform(function(filename) {
	    var b = browserify(filename);
	    return b.bundle();
	});
	return gulp.src(env.build.devPath+'/scripts/pages/{*,}')
		.pipe(flatmap(function(stream, dir){
			return gulp.src(dir.path + '/**/*.js')
				.pipe(plumber())
				.pipe(sourcemaps.init())
				.pipe(webpack({
					module:{
						rules:[
							{
								test: /\.js?$/,
								loader: 'babel-loader',
								query: {
									presets: ['es2015']
								}
							},
						]
					},
					output: {
						filename: "bundle.js"
					}
				}))
				// .pipe(concat('modules.js'))
				.pipe(isProd ? uglify({
					mangle: true,
					sourceMap: false,
					ie8: true,
					compress: true
				}) : gutil.noop())
				.pipe(size({gzip: env.build.compressionGzip}))
				.pipe(sourcemaps.write('.'))
				.pipe(logger({
					before: 'STARTED COMPILING MODULAR SCRIPTS',
					after: 'FINISH COMPILING MODULAR SCRIPTS'
				}))
				.pipe(gulp.dest(env.build.distPath+'/scripts/pages/' + path.relative(dir.base, dir.path)))
		}))
		// .pipe(isProd ? connect.reload() : gutil.noop())
});

gulp.task('scss', ['clear'], function(){
	return gulp.src(env.build.devPath+'/styles/*.scss')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'compressed',
			includePaths : [env.build.devPath, env.build.distPath]
		}).on('error', sass.logError))
		.pipe(size({gzip: env.build.compressionGzip}))
		.pipe(cssnano({
			// discardComments : true
		}))
		.pipe(sourcemaps.write())
		.pipe(logger({
			before: 'STARTED COMPILING SASS FILE',
			after: 'FINISH COMPILING SASS FILE',
			showChange: true
		}))
		.pipe(gulp.dest(env.build.distPath+'/styles'))
		// .pipe(isProd ? connect.reload() : gutil.noop())
});

gulp.task('create_server', function(){
	gutil.log(chalk.red('STARTED CREATE SERVER'));
	connect.server({
		root: ['dist', __dirname],
		livereload: (isProd ? false : true),
		port: process.env.PORT_STATIC,
		middleware: function(){
			return [cors];
		}
	});
});

gulp.task('template_server', function(){
		connect.server({
			root: __dirname,
			livereload : true,
			port : process.env.PORT_TEMPLATE
		});
});

gulp.task('global_server', function(){
	create_server;
});

gulp.task('fonts', function(){
	return gulp.src(env.build.devPath+'/fonts/**/*.*')
		.pipe(size({gzip: env.build.compressionGzip}))
		.pipe(gulp.dest(env.build.distPath+'/fonts'))
});

gulp.task('vendors', function(){
	return gulp.src(env.build.devPath+'/vendors/**/*.*')
		.pipe(size({gzip: env.build.compressionGzip}))
		.pipe(gulp.dest(env.build.distPath+'/vendors'))
});

gulp.task('images', function(){
	return gulp.src(env.build.devPath+'/images/**/*.*')
		.pipe(size({gzip: env.build.compressionGzip}))
		.pipe(gulp.dest(env.build.distPath+'/images'))
});

gulp.task('watch', function(){
	gulp.watch(env.build.devPath+'/scripts/**/*.js', ['linting']);
	gulp.watch(env.build.devPath+'/scripts/commons/*.js', ['commons_scripts']);
	gulp.watch(env.build.devPath+'/scripts/components/**/*.js', ['modular_scripts']);	
	gulp.watch(env.build.devPath+'/scripts/pages/**/*.js', ['pages_scripts']);	
	gulp.watch(env.build.devPath+'/styles/**/*.scss', ['scss']);
	gulp.watch(env.build.devPath+'/fonts/**/*.*', ['fonts']);
	gulp.watch(env.build.devPath+'/vendors/**/*.*', ['vendors']);
	gulp.watch(env.build.devPath+'/images/**/*.*', ['images']);
	gulp.watch(env.build.devPath+'/**/*.*', ['clear']);
});

gulp.task('default', taskList);