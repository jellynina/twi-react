var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber'); // make sure the task will break when there is an error

gulp.task('browserify', function (){
  gulp.src('src/main.js') //all start form main.js
    .pipe(plumber())
    .pipe(browserify({ transform: 'reactify', debug: true}))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('public'));
});

gulp.task('default', ['browserify']);

gulp.task('watch', function (){
  gulp.watch('src/**/*.*', ['default']);
});