var gulp = require('gulp');
var ts = require('gulp-typescript');
var browserSync = require('browser-sync').create();

gulp.task('typescript', function() {
  gulp.src('src/app/*.ts')
      .pipe(ts({
        noImplicitAny: true
      }))
      .pipe(gulp.dest('app/'));
});

gulp.task('scripts', function() {
  gulp.src('src/js/*.js')
      .pipe(gulp.dest('js/'));
});

gulp.task('html', function() {
  gulp.src('src/index.html')
      .pipe(gulp.dest('./'));
});

gulp.task('default', ['html', 'scripts', 'typescript'], function() {
  browserSync.init({
    server: './'
  });

  gulp.watch('src/**/*.ts', ['typescript']).on('change', browserSync.reload());
});
