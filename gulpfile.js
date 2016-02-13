var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

gulp.task('styles', function() {
  gulp.src('src/styles/main.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 2 versions']
      }))
      .pipe(gulp.dest('styles/'))
      .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
  gulp.src('src/js/*.js')
      .pipe(gulp.dest('js/'));
  gulp.src('src/app/**/*.js')
      .pipe(gulp.dest('app/'));
});

gulp.task('html', function() {
  gulp.src('src/index.html')
      .pipe(gulp.dest('./'));
  gulp.src('src/views/**/*.html')
      .pipe(gulp.dest('views/'));
});

gulp.task('default', ['html', 'styles', 'scripts'], function() {
  gulp.watch(['src/styles/**/*.scss'], ['styles']);
  gulp.watch(['src/js/*.js', 'src/app/**/*.js'], ['scripts'])
      .on('change', browserSync.reload);
  gulp.watch(['src/index.html', 'src/views/**/*.html'], ['html'])
      .on('change', browserSync.reload);

  browserSync.init({
    server: './'
  });
});
