var gulp = require('gulp');
var tsc = require('gulp-tsc');
var shell = require('gulp-shell');
var runseq = require('run-sequence');
var tslint = require('gulp-tslint');
var browserSync = require("browser-sync");
var Mocha = require('mocha');

var paths = {
  tscripts: {
    src: ['src/**/*.ts', '!src/**/*.specs.ts'],
    dest: 'dist'
  },
  tests: {
    result: 'results',
    dir: 'test-results'
  }
};

gulp.task('default', ['lint', 'buildrun']);

// ** Running ** //

gulp.task('run', shell.task([
  'node dist/index.js'
]));

gulp.task('mocha:web', shell.task([
  'mocha --opts test/mocha.opts --watch --reporter mochawesome --reporter-options reportDir=' + paths.tests.dir + ',reportName=' + paths.tests.result + ',reportTitle="Songs.js",inlineAssets=true'
]));

gulp.task('buildrun', function (cb) {
  runseq('build', 'run', cb);
});

gulp.task("browser-sync", function () {
  "use strict";
  browserSync({
    server: {
      //serve tests and the root as base dirs
      baseDir: ["./" + paths.tests.dir + "/", "./"],
      //make tests.html the index file
      index: paths.tests.result + ".html"
    }
  });

  gulp.watch(paths.tests.dir + "/*.html").on('change', browserSync.reload);
});

gulp.task('test:watch:web', ['mocha:web', 'browser-sync']);

// ** Watching ** //

gulp.task('watch', function () {
  gulp.watch(paths.tscripts.src, ['compile:typescript']);
});

gulp.task('watchrun', function () {
  gulp.watch(paths.tscripts.src, runseq('compile:typescript', 'run'));
});

// ** Compilation ** //

gulp.task('build', ['compile:typescript']);
gulp.task('compile:typescript', function () {
  return gulp
    .src(paths.tscripts.src)
    .pipe(tsc({
      module: "commonjs",
      emitError: false,
      target: "es5"
    }))
    .pipe(gulp.dest(paths.tscripts.dest));
});

// ** Linting ** //

gulp.task('lint', ['lint:default']);
gulp.task('lint:default', function () {
  return gulp.src(paths.tscripts.src)
    .pipe(tslint())
    .pipe(tslint.report('prose', {
      emitError: false
    }));
});
