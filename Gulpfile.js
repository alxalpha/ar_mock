'use strict';

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    del = require('del'),
    runSequence = require('run-sequence'),
    wiredep = require('wiredep').stream,
    rename    = require('gulp-rename');


/******************************************************************************
 *
 * ENV
 *
 *******************************************************************************/

var config = {
    app: 'back/ar_mock/front/src/',
    dist: 'back/ar_mock/front/dist/',
    test: 'back/ar_mock/front/test/',
    tmp : 'back/ar_mock/front/tmp/'
};


/******************************************************************************
 *
 * CLEAN
 *
 *******************************************************************************/

gulp.task('clean', function (cb) {
    del([config.dist,config.tmp], cb);
});


/******************************************************************************
 *
 * BUILD
 *
 *******************************************************************************/

gulp.task('images', function() {
    return gulp.src(config.app + 'assets/images/**').
        pipe(gulp.dest(config.dist));
});

gulp.task('styles', [], function() {
    return gulp.src(config.app + 'assets/styles/**/*.css')
        .pipe(concat('ar_mock.css'))
        .pipe(gulp.dest(config.dist));
});

gulp.task('build', function () {
    runSequence('clean','wiredep','process-scripts','images','styles');
});



gulp.task('wiredep', function () {
    var s = gulp.src(config.app + 'index.html')
        .pipe(wiredep())
        .pipe(gulp.dest(config.app ));

    return s;
});


gulp.task('default', function () {
    runSequence('build');
});

gulp.task('process-scripts', function() {
    return gulp.src([config.app + '**/*.js',config.tmp + '**/*.js'])
        .pipe(concat('ar_mock.js'))
        .pipe(gulp.dest(config.dist))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(config.dist));

});



gulp.task('watch', function() {
    gulp.watch('./src/**/*.js', ['process-scripts', 'ngdocs']);

});

