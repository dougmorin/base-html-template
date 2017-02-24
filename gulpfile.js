// GULP variable declarations
var gulp = require('gulp'),
  sass = require('gulp-ruby-sass'),
  prefix = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  minifycss = require('gulp-minify-css'),
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant');

// Process SASS functionality
gulp.task('process-scss', function() {
  return sass('public_html/scss/style.scss', { style: 'expanded', compass: true, })
    .pipe(prefix(['last 2 versions']))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('public_html/tmp/'))
    .pipe(rename('style.css.min'))
    .pipe(minifycss())
    .pipe(gulp.dest('public_html/tmp/'))
    .on('error', function (err) {
      console.error('Error', err.message);
    });
});

// Process custom SCRIPTS functionality
gulp.task('process-custom-script', function() {
  return gulp.src('public_html/js/custom/**/*.js')
    .pipe(concat('script.js'))
    .pipe(gulp.dest('public_html/tmp/'))
    .pipe(uglify())
    .pipe(rename('script.js.min'))
    .pipe(gulp.dest('public_html/tmp/'))
    .on('error', function (err) {
      console.error('Error', err.message);
    });
});

// Setup the gulp WATCH functionality
gulp.task('default', function() {
  gulp.start('process-scss');
  gulp.start('process-custom-script');
  gulp.watch('public_html/scss/**/*.scss', ['process-scss']);
  gulp.watch('public_html/js/custom/**/*.js', ['process-custom-script']);
});
