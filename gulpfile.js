'use strict';

// Gulp + plugins
const gulp = require('gulp');
const ts = require('gulp-typescript');
const less = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');

// Autoprefix
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({browsers: ['last 2 versions']});

// BrowserSync
const browserSync = require('browser-sync').create();

// Typescript
const tscProject = ts.createProject('tsconfig.json');

// Node
const child_process = require('child_process');
const del = require('del');

// Utils
function swallowError(error) {
;  // If you want details of the error in the console
  console.log(error.toString())

  this.emit('end')
}

gulp.task('ts', () => {
  return tscProject.src()
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(tscProject())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('angular-aot', (done) => {
  child_process.execFile('./node_modules/.bin/ngc', ['-p', 'tsconfig.aot.json'], function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    done(err);
  });
});

gulp.task('less', () => {
  return gulp.src('src/global.less')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(less({plugins: [autoprefix]}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream());
});

gulp.task('clean', () => {
  return del(['dist/', 'aot/']);
});

gulp.task('copy:html', () => {
  return gulp.src(['src/**/*.html'])
    .pipe(gulp.dest('dist/'));
});

gulp.task('copy:js', () => {
  return gulp.src(['src/**/*.js'])
    .pipe(gulp.dest('dist/'));
});

gulp.task('copy:css', () => {
  return gulp.src(['src/**/*.css'])
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream());
});

gulp.task('copy:assets', () => {
  return gulp.src(['src/assets/**/*'])
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('default', [
  'copy:js',
  'copy:html',
  'copy:css',
  'copy:assets',
  'less',
  'ts'], () => {
  console.log('><> Gulp ><>');
});

gulp.task('prod', ['default', 'angular-aot']);

gulp.task('watch', ['default'], function() {
  browserSync.init({
    server: {
      baseDir: ['.'],
      routes: {
        '/node_modules': 'node_modules',
        '/': 'dist'
      }
    },
    httpModule: 'http2',
    https: true
  });

  gulp.watch([
    'dist/**/*.html',
    'dist/**/*.js',
    'dist/assets/**/*'
  ])
    .on('change', browserSync.reload);

  gulp.watch('src/**/*.ts', ['ts']);
  gulp.watch('src/**/*.less', ['less']);
  gulp.watch('src/**/*.html', ['copy:html']);
  gulp.watch('src/**/*.js', ['copy:js']);
  gulp.watch('src/**/*.css', ['copy:css']);
  gulp.watch('src/assets/**/*', ['copy:assets']);
});
