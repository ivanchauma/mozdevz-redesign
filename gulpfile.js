var gulp = require('gulp'),
	compass = require('gulp-compass'),
	path =	require('path'),
	minifyCSS = require('gulp-minify-css'),
	browserSync = require('browser-sync');

gulp.task('sass', function(){
	gulp.src('./public/sass/*.scss')
	.pipe(compass({
		project: path.join(__dirname, 'public'),
		css: 'css',
		sass: 'sass'

	}))
	.on('error', function(error){
		console.log(error);
		this.emit('end');
	})
	// .pipe(minifyCSS())
	.pipe(gulp.dest('./css'));
});

gulp.task('browser-sync', function(){
	browserSync.init(['./public/css/**', './views/**'], {
		open: false,
		proxy: '127.0.0.1:3000'
	});
});

gulp.task('watch', ['sass', 'browser-sync'], function(){
	gulp.watch('./public/sass/**/*.scss', ['sass']);
});