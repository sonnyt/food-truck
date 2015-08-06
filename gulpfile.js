'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var watch = require('gulp-watch');
var del = require('del');

var paths = {
    scripts: {
        src: './app/js/**/*.js',
        libs: [
            './bower_components/backbone/backbone-min.js',
            './bower_components/requirejs/require.js',
            './bower_components/underscore/underscore-min.js',
            './bower_components/jquery/dist/jquery.min.js',
            './bower_components/text/text.js'
        ]
    },
    styles: [
        './app/scss/**/*.scss'
    ],
    images: [
        './app/img/**/*.{png,jpg,gif}'
    ],
    html: [
        './app/html/**/*.html'
    ],
    fonts: [
        './bower_components/font-awesome/fonts/**/*'
    ]
};

gulp.task('clean', function(cb) {
    del(['./public'], cb);
});

gulp.task('javascript:src', function() {
    return gulp.src(paths.scripts.src)
            .pipe(gulp.dest('./public/js'));
});

gulp.task('javascript:libs', function() {
    return gulp.src(paths.scripts.libs)
            .pipe(gulp.dest('./public/js/libs'));
});

gulp.task('sass', function() {
    return gulp.src(paths.styles)
            .pipe(sass())
            .pipe(gulp.dest('./public/css'));
});

gulp.task('fonts', function() {
    return gulp.src(paths.fonts)
            .pipe(gulp.dest('./public/fonts'));
});

gulp.task('html', function() {
    return gulp.src(paths.html)
            .pipe(gulp.dest('./public/html'));
});

gulp.task('watch', function() {
    var scripts = [].concat(paths.scripts.libs, paths.scripts.src);

    watch(paths.scripts.src, function() {
        gulp.start('javascript:src');
    });

    watch(paths.scripts.libs, function() {
        gulp.start('javascript:libs');
    });

    watch(paths.styles, function() {
        gulp.start('sass');
    });

    watch(paths.html, function() {
        gulp.start('html');
    });

    watch(paths.fonts, function() {
        gulp.start('fonts');
    });
});

gulp.task('compile', ['javascript:src', 'javascript:libs', 'sass', 'fonts', 'html']);

gulp.task('default', ['clean'], function() {
    gulp.start('compile');
});