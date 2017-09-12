"use strict";
var gulp = 			require('gulp');
var connect = 		require('gulp-connect');
var livereload = 	require('gulp-livereload');
var spritecreator = require('gulp.spritesmith');
var html = 		require('gulp-htmlincluder');
var sass = 			require('gulp-sass');
var replace = 		require('gulp-html-replace');

gulp.task('sprite', function(){
	var spriteData = gulp.src('img/png/*.png')
						.pipe(spritecreator({
							imgName: 'sprite.png',
							cssName: 'sprite.css',
							algorithm: 'binary-tree'
						}));
	spriteData.img.pipe(gulp.dest('build/img/'));
	spriteData.css.pipe(gulp.dest('build/css/'));
});
gulp.task('html', function(){
	gulp.src('scss/**/*.html')
		.pipe(html())
		.pipe(replace({
			css: 'build/css/style.css'
		}))
		.pipe(gulp.dest('build/'))
		.pipe(connect.reload());
});
gulp.task('server', function(){
	connect.server({
		root : '',
		livereload: true
	});
});
gulp.task('sass', function () {
  return gulp.src('scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/css/'))
    .pipe(connect.reload());
});


gulp.task('default', function(){
	gulp.start('sass','html', 'server');

	gulp.watch('scss/**/*.scss', ['sass'], function(){
		gulp.start('sass');
	});
		gulp.watch(['scss/**/*.html'], function(){
		gulp.start('html');
	});
});