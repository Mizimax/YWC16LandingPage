var gulp = require("gulp");
var sass = require("gulp-sass");
var connect = require("gulp-connect");

gulp.task("connect", function() {
  connect.server({
    root: "src",
    livereload: true
  });
});

gulp.task("sass", function() {
  return gulp
    .src("./src/sass/*.scss")
    .pipe(sass({ errLogToConsole: true }))
    .pipe(gulp.dest("./src/css"));
});

gulp.task("livereload", function() {
  gulp.src("./src/**/*").pipe(connect.reload());
});

gulp.task("watch", function() {
  gulp.watch("./src/sass/**/*.scss", ["sass"]);
  gulp.watch("./src/**/*", ["livereload"]);
});

gulp.task("default", ["connect", "watch", "sass"]);
