var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var maps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');



gulp.task('browserify', function (){
  gulp.src('src/main.js')
    .pipe(plumber())
    .pipe(browserify({ transform: 'reactify', debug: true}))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('public'));
});

/* 最後再來改寫這邊 */
gulp.task("compileSass", function (){
  return gulp.src("scss/style.scss")
  .pipe(plumber())
  .pipe(maps.init())
  .pipe(sass())
  .pipe(maps.write('./')) //this path is going to be relative to our output directory ??
  .pipe(gulp.dest("public"));
});

gulp.task('default', ['browserify']);

gulp.task('watch', function (){
  gulp.watch('scss/**/*.scss', ['compileSass']);
  gulp.watch('src/**/*.*', ['default']);
});