const gulp = require("gulp");
const gulpConnect = require("gulp-connect");
const gulpMinifyCss = require("gulp-minify-css");
const gulpConcat = require("gulp-concat");
const gulpUglify = require("gulp-uglify");
const gulpHtmlmin = require("gulp-htmlmin");
const clean = require("gulp-clean");

gulp.task("sayHello", async function () {
  console.log("Halo, selamat datang di wadahkode");
});

gulp.task("server", async function () {
  gulpConnect.server({
    root: "docs",
    livereload: true,
  });
});

// task untuk minify
gulp.task("minify-css", async function () {
  gulp
    .src("./public/css/*.css")
    .pipe(
      gulpMinifyCss({
        compatibility: "ie8",
      })
    )
    .pipe(gulp.dest("./docs/css/"))
    .pipe(gulpConnect.reload());
});

gulp.task("minify-js", async function () {
  gulp
    .src(["./public/js/*.js"])
    .pipe(gulpConcat("calculator.js"))
    .pipe(gulpUglify())
    .pipe(gulp.dest("./docs/js/"))
    .pipe(gulpConnect.reload());
});

gulp.task("minify-html", async function () {
  gulp
    .src("public/*.html")
    .pipe(
      gulpHtmlmin({
        collapseWhitespace: true,
      })
    )
    .pipe(gulp.dest("docs"))
    .pipe(gulpConnect.reload());
});

gulp.task("watch", async function () {
  gulp.watch("public/js/*.js", gulp.series("minify-js"));
  gulp.watch("public/css/*.css", gulp.series("minify-css"));
  gulp.watch("public/*.html", gulp.series("minify-html"));
});

gulp.task("clean", function () {
  return gulp
    .src("docs", {
      read: false,
      allowEmpty: true,
    })
    .pipe(clean());
});

gulp.task(
  "build",
  gulp.series("clean", "minify-css", "minify-js", "minify-html")
);
gulp.task("default", gulp.series("server"));
