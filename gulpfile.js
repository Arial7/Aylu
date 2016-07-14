// © 2016 Slashkeys Development - All rights reserved.
// For licensing, please consult the LICENSE file in the project root.
//
// File: gulpfile.js
// Description: Gulp configuration file.
// Author: Pascal Riesinger <pascal@slashkeys.com>

var gulp = require("gulp");

var typescript = require("gulp-typescript");
var tslint     = require("gulp-tslint");

var paths = {
    typescript: {
        src: "src/**/*.ts",
        dest: "dist/"
    },
    test: {
        src: "test/*.ts",
        dest: "test/"
    }
}

gulp.task("scripts", function() {
    return gulp.src(paths.typescript.src)
        .pipe(typescript())
        .pipe(gulp.dest(paths.typescript.dest));
});

gulp.task("test", function() {
    return gulp.src(paths.test.src)
        .pipe(typescript())
        .pipe(gulp.dest(paths.test.dest));
});

gulp.task("default", function() {
    gulp.start("scripts");
    gulp.watch(paths.typescript.src, ["scripts"]);
});

gulp.task("build", function() {
    gulp.start("scripts"); 
    gulp.start("test");
});
