var gulp = require("gulp");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var uglify = require('gulp-uglify');
//var sourcemaps = require("gulp-sourcemaps");

gulp.task("build-dist", function () {
  return gulp.src("lib/**/*.js")
    //.pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(uglify())
    //.pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
});
