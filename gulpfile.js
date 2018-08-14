var gulp = require("gulp");
var sass = require("gulp-sass");
var connect = require("gulp-connect");
var wait = require("gulp-wait");
var plumber = require("gulp-plumber");

function swallowError(error) {
  console.log(error.toString());

  this.emit("end");
}

gulp.task("connect", function() {
  connect.server({
    root: "src",
    livereload: true
  });
});

gulp.task("sass", function() {
  return gulp
    .src("./src/sass/*.scss")
    .pipe(wait(500))
    .pipe(sass({ errLogToConsole: true }))
    .on("error", swallowError)
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
