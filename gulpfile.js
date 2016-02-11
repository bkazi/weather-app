var gulp = require('gulp');
var ts = require('gulp-typescript');
var browserSync = require('browser-sync').create();

gulp.task('typescript', function() {
  gulp.src('src/app/*.ts')
      .pipe(ts({
        noImplicitAny: true,
        out: 'output.js'
      }))
      .pipe(gulp.dest('app/'));
});

gulp.task('html', function() {
  gulp.src('src/index.html')
      .pipe('/');
});

gulp.task('default', ['typescript'], function() {
  browserSync.init({
    server: './'
  });

  gulp.watch('src/**/*.ts', ['typescript']).on('change', browserSync.reload());
});
