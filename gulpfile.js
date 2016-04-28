var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");

gulp.task("default", function () {
  return gulp.src("lib/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("nd-conf.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
});
