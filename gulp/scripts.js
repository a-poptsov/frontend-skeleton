'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var argv = require('yargs').argv;

var _ = require('lodash');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

gulp.task('scripts', ['config']);

gulp.task('validated-scripts', $.sequence('scripts', 'eslint'));

gulp.task('eslint', function () {
  return gulp.src(path.join(conf.paths.src, '/app/**/*.js'))
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError())
    .pipe(browserSync.reload({stream: true}))
    .pipe($.size());
});

gulp.task('config', function () {
  return gulp.src(path.join(conf.paths.src, '/app/config/config.env.json'))
    .pipe($.ngConstant({
      constants: {
        env: _.transform(_.extend(_.clone(conf.defaults), _.pick(argv, _.keys(conf.defaults))), function (result, value, key) {
          result[key] = value.toString();
        }, {})
      }
    }))
    .pipe(gulp.dest(path.join(conf.paths.src, '/app/config/')));
});
