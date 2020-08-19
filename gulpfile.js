const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const cssNano = require('gulp-cssnano');
const rename = require('gulp-rename');

gulp.task('sass', function () {
  return gulp
    .src('./src/sass/style.sass')
    .pipe(
      sass({
        outputStyle: 'compressed',
      }).on('error', sass.logError),
    )
    .pipe(
      autoprefixer({
        cascade: false,
      }),
    )
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream());
});

gulp.task('html', function () {
  return gulp.src('./public/*.html').pipe(browserSync.stream());
});

gulp.task('css-libs', function () {
  return gulp
    .src('node_modules/normalize.css/normalize.css')
    .pipe(cssNano())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('browserSync', async function () {
  browserSync.init({
    server: './public',
    notify: false,
  });
});

gulp.task('watch', function () {
  gulp.watch('./public/*.html', gulp.parallel('html'));
  gulp.watch('./src/sass/*.sass', gulp.parallel('sass'));
});

gulp.task('default', gulp.parallel('html', 'css-libs', 'sass', 'browserSync', 'watch'));