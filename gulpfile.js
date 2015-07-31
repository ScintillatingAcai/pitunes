var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
// var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
// var sh = require('shelljs');
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
  clientjs: ['./client/src/**/*.jsx',
      './client/src/**/**/*.jsx',
      './client/src/**/**/**/*.jsx'],
  clientapp: ['./client/src/app/router.jsx'],
  serverjs: ['./server/*.js',
      './server/**/*.js',
      './server/**/**/*.js'
    ],
  browserify_client: 'bundle-client.js',
  uglify_client: 'bundle-client.min.js',
  dist: './client/dist',
  distcss: '/css',
  distfont: '/font',
  distlib: '/lib'
};

var libFilesToMove = ['./node_modules/socket.io/node_modules/socket.io-client/socket.io.js',
      './node_modules/jquery/dist/jquery.min.js',
      './node_modules/jquery/dist/jquery.min.map',
      // './node_modules/bootstrap/dist/js/bootstrap.min.js',
      './node_modules/bootstrap/dist/css/bootstrap.min.css',
      './node_modules/bootstrap/dist/css/bootstrap.min.map',
      // './node_modules/react-bootstrap/dist/react-bootstrap.min.js',
      './node_modules/font-awesome/css/font-awesome.min.css',
      './node_modules/font-awesome/css/font-awesome.min.map',
      './client/src/room/centerContainer/video/playerController.js'];

var fontFilesToMove =  ['./node_modules/font-awesome/fonts/*.*'];     


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
   .pipe(source(paths.browserify_client))
   .pipe(buffer())
   .pipe(gulp.dest(paths.dist));
});

gulp.task('uglify-client', ['browserify-client'], function () {
  return gulp.src([paths.dist + "/" + paths.browserify_client])
  .pipe(uglify())
  .pipe(rename('bundle-client.min.js'))
  .pipe(gulp.dest(paths.dist));
});

gulp.task('clean', function(){
  return del(['./node_modules', paths.dist]);
});

gulp.task('move_lib', ['move_fonts'], function(){
  return gulp.src(libFilesToMove)
  .pipe(gulp.dest(paths.dist + paths.distlib));
});

gulp.task('move_fonts', function(){
  return gulp.src(fontFilesToMove, { base: './node_modules/font-awesome/' })
  .pipe(gulp.dest(paths.dist));
});

gulp.task('lint', function() {
  return gulp.src(paths.clientjs, paths.serverjs)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
  return gulp.watch(paths.clientjs, ['uglify-client']);
});

gulp.task('install_lib', function() {
  return gulp.src(['./package.json'])
  .pipe(install());
});

gulp.task('default', ['install_lib', 'move_lib', 'uglify-client']);
