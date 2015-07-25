var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var del = require('del');
var jshint = require('gulp-jshint');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var install = require('gulp-install');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var glob = require('glob-array');


var paths = {
  sass: ['./scss/**/*.scss'],
  clientjs: ['./client/src/**/*.js',
      './client/src/**/**/*.js',
      './client/src/**/**/**/*.js'],
  clientapp: ['./client/src/app/app.js',
      './client/src/landingPage/landingPageContainer.js',
      './client/scr/rooms/roomsContainer.js'],
  serverjs: ['./server/*.js',
      './server/**/*.js',
      './server/**/**/*.js'
    ],
  dist: './dist'
};

// var libFilesToMove = [];


// gulp.task('sass', function(done) {
//   gulp.src('./scss/ionic.app.scss')
//     .pipe(sass({
//       errLogToConsole: true
//     }))
//     .pipe(gulp.dest('./www/css/'))
//     .pipe(minifyCss({
//       keepSpecialComments: 0
//     }))
//     .pipe(rename({ extname: '.min.css' }))
//     .pipe(gulp.dest('./www/css/'))
//     .on('end', done);
// });
// 
gulp.task('browserify-client', function (cb) {

  var files = glob.sync(paths.clientapp);
  var b = browserify();
  console.log(files.length);
  files.forEach(function (file) {
    b.add(file);
  });

  return b.transform(babelify).bundle()
   .pipe(source('bundle-client.min.js'))
   .pipe(buffer())
   .pipe(uglify())
   .pipe(gulp.dest(paths.dist + '/client'));
});

gulp.task('browserify-server', function () {
  var files = glob.sync(paths.serverjs);
  var b = browserify();
  console.log(files.length);
  files.forEach(function (file) {
    b.add(file);
  });

  return b.transform(babelify).bundle()
   .pipe(source('bundle-server.min.js'))
   .pipe(buffer())
   .pipe(uglify())
   .pipe(gulp.dest(paths.dist + '/server'));
});

// gulp.task('babel', function(){
//   return gulp.src(paths.clientjs)
//     .pipe(babel())
//     .pipe(gulp.dest(paths.dist));
// });

gulp.task('clean', function(){
  del(['./node_modules','./client/bower_components', paths.dist]);
});

// gulp.task('move_lib',['clean'], function(){
//   gulp.src(libFilesToMove)
//   .pipe(gulp.dest('./www/lib/'));
// });

gulp.task('lint', function() {
  return gulp.src(paths.clientjs, paths.serverjs)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
  gulp.watch(paths.clientjs,paths.serverjs);
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('install_lib', function() {
  return gulp.src(['./bower.json', './package.json'])
  .pipe(install());
});

//gulp.task('default', ['install_lib', 'babel', 'lint', 'browserify-client']);
gulp.task('default', ['install_lib', 'browserify-client']);
