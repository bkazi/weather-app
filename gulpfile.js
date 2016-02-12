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

gulp.task('default', ['html', 'scripts'], function() {
  // gulp.watch('src/**/*.ts', gulp.task('typescript')).on('change', browserSync.reload);
  gulp.watch(['src/js/*.js'], ['scripts'])
      .on('change', browserSync.reload);
  gulp.watch(['src/index.html'], ['html'])
      .on('change', browserSync.reload);

  browserSync.init({
    server: './'
  });
});
