var gulp = require("gulp"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify");

gulp.task("javascriptFiles", function(){
    return gulp.src([
        "./public/javascripts/*.js", 
        "./public/javascripts/services/*.js",
        "./public/javascripts/services/**/*.js",
        "./public/javascripts/controllers/*.js",
        "./public/javascripts/handlers/*.js"
        ])
        .pipe(concat("app.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./public/javascripts/"));
});

gulp.task("default", ["javascriptFiles"], function(){
    //
});