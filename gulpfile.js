const gulp = require("gulp");
const beautify = require("gulp-beautify");
const browserSync = require("browser-sync").create();
const clean = require("gulp-clean");
const fileInclude = require("gulp-file-include");
const sass = require("gulp-sass");

// compile sass into css
gulp.task("sass", () => {
  return gulp.src("src/assets/scss/**/*.scss")
    .pipe(sass())
    .pipe(gulp.dest(".temp/assets/css"))
    .pipe(browserSync.stream());
});

// compile html
gulp.task("html", () => {
  return gulp.src([
    "src/**/*.html",
    "!src/partials/**/*.html"
  ])
    .pipe(fileInclude({
      prefix: "@@",
      basepath: "./src/partials/",
    }))
    .pipe(gulp.dest(".temp"))
    .pipe(browserSync.stream());
});

// copy image
gulp.task("image", () => {
  return gulp.src("src/assets/img/**/*")
    .pipe(gulp.dest(".temp/assets/img"))
    .pipe(browserSync.stream());
});

// copy js
gulp.task("js", () => {
  return gulp.src("src/assets/js/**/*")
    .pipe(gulp.dest(".temp/assets/js"))
    .pipe(browserSync.stream());
});

// copy vendor
gulp.task("vendor", () => {
  return gulp.src("src/vendor/**/*")
    .pipe(gulp.dest(".temp/vendor"))
    .pipe(browserSync.stream());
});

// make server + watch html & sass & image & js
gulp.task("serve", gulp.series("sass", "html", "image", "js", "vendor", () => {
  browserSync.init({ server: "./.temp" });

  gulp.watch(
    "src/assets/scss/**/*.scss",
    gulp.series("sass")
  );
  gulp.watch(
    "src/**/*.html",
    gulp.series("html")
  );
  gulp.watch(
    "src/assets/img/**/*",
    gulp.series("image")
  );
  gulp.watch(
    "src/assets/js/**/*",
    gulp.series("js")
  );
}));

// clean .temp folder
gulp.task("clean:temp", () => {
  return gulp.src(".temp", { read: false, allowEmpty: true })
    .pipe(clean());
});

// =======================
// Build to dist directory
// =======================

// compile sass into css
gulp.task("build:sass", () => {
  return gulp.src("src/assets/scss/**/*.scss")
    .pipe(sass())
    .pipe(beautify.css({ indent_size: 2 }))
    .pipe(gulp.dest("dist/assets/css"));
});

// compile html
gulp.task("build:html", () => {
  return gulp.src([
    "src/**/*.html",
    "!src/partials/**/*.html"
  ])
    .pipe(fileInclude({
      prefix: "@@",
      basepath: "./src/partials/",
    }))
    .pipe(beautify.html({ indent_size: 2 }))
    .pipe(gulp.dest("dist"));
});

// copy image
gulp.task("build:image", () => {
  return gulp.src("src/assets/img/**/*")
    .pipe(gulp.dest("dist/assets/img"));
});

// copy js
gulp.task("build:js", () => {
  return gulp.src("src/assets/js/**/*")
    .pipe(gulp.dest("dist/assets/js"));
});

// copy vendor
gulp.task("build:vendor", () => {
  return gulp.src("src/vendor/**/*")
    .pipe(gulp.dest("dist/vendor"));
});

// clean dist folder
gulp.task("clean:dist", () => {
  return gulp.src("dist", { read: false, allowEmpty: true })
    .pipe(clean());
});

// ========================================
// use this command below

// gulp : for start development
// gulp build : for build to dist directory
// ========================================

// development
gulp.task("default", gulp.series("clean:temp", "clean:dist", "serve"));

// dist
gulp.task("build", gulp.series("clean:temp", "clean:dist", "build:sass", "build:html", "build:image", "build:js", "build:vendor"));
