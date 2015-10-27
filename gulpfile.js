// FOUNDATION FOR APPS TEMPLATE GULPFILE
// -------------------------------------
// This file processes all of the assets in the "client" folder, combines them with the Foundation for Apps assets, and outputs the finished files in the "build" folder as a finished app.

// 1. LIBRARIES
// - - - - - - - - - - - - - - -

var $        = require('gulp-load-plugins')();
var argv     = require('yargs').argv;
var gulp     = require('gulp');
var rimraf   = require('rimraf');
var router   = require('front-router');
var sequence = require('run-sequence');
var exec     = require('child_process').exec;


// Check for --production flag
var isProduction = !!(argv.production);

// 2. FILE PATHS
// - - - - - - - - - - - - - - -

var paths = {
  assets: [
    './ClientApp/client/**/*.*',
    '!./ClientApp/client/templates/**/*.*',
    '!./ClientApp/client/assets/{scss,js}/**/*.*'
  ],
  // Sass will check these folders for files when you use @import.
  sass: [
    'ClientApp/client/assets/scss',
    'bower_components/foundation-apps/scss'
  ],
  // These files include Foundation for Apps and its dependencies
  foundationJS: [
    'bower_components/fastclick/lib/fastclick.js',
    'bower_components/viewport-units-buggyfill/viewport-units-buggyfill.js',
    'bower_components/tether/tether.js',
    'bower_components/hammerjs/hammer.js',
    'bower_components/angular/angular.js',
    'bower_components/angular-animate/angular-animate.js',
    'bower_components/angular-ui-router/release/angular-ui-router.js',
    'bower_components/foundation-apps/js/vendor/**/*.js',
    'bower_components/foundation-apps/js/angular/**/*.js',
    '!bower_components/foundation-apps/js/angular/app.js'
  ],
  // These files are for your app's JavaScript
  appJS: [
    'ClientApp/client/assets/js/app.js',
  ],
  ctrJS : [
    'ClientApp/client/assets/js/controllers/*.js',
  ],
  srvJS : [
    'ClientApp/client/assets/js/services/*.js',
  ]
}

// 3. TASKS
// - - - - - - - - - - - - - - -

// Cleans the build directory
gulp.task('clean', function(cb) {
  rimraf('./ClientApp/build', cb);
});

// Copies everything in the client folder except templates, Sass, and JS
gulp.task('copy', function() {
  return gulp.src(paths.assets, {
    base: './ClientApp/client/'
  })
    .pipe(gulp.dest('./ClientApp/build'))
  ;
});

// Copies your app's page templates and generates URLs for them
gulp.task('copy:templates', function() {
  return gulp.src('./ClientApp/client/templates/**/*.html')
    .pipe(router({
      path: 'ClientApp/build/assets/js/routes.js',
      root: 'ClientApp/client'
    }))
    .pipe(gulp.dest('./ClientApp/build/templates'))
  ;
});

// Compiles the Foundation for Apps directive partials into a single JavaScript file
gulp.task('copy:foundation', function(cb) {
  gulp.src('bower_components/foundation-apps/js/angular/components/**/*.html')
    .pipe($.ngHtml2js({
      prefix: 'components/',
      moduleName: 'foundation',
      declareModule: false
    }))
    .pipe($.uglify())
    .pipe($.concat('templates.js'))
    .pipe(gulp.dest('./ClientApp/build/assets/js'))
  ;

  // Iconic SVG icons
  gulp.src('./bower_components/foundation-apps/iconic/**/*')
    .pipe(gulp.dest('./ClientApp/build/assets/img/iconic/'))
  ;

  cb();
});

// Compiles Sass
gulp.task('sass', function () {
  return gulp.src('ClientApp/client/assets/scss/app.scss')
    .pipe($.sass({
      includePaths: paths.sass,
      outputStyle: (isProduction ? 'compressed' : 'nested'),
      errLogToConsole: true
    }))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie 10']
    }))
    .pipe(gulp.dest('./ClientApp/build/assets/css/'))
  ;
});

// Compiles and copies the Foundation for Apps JavaScript, as well as your app's custom JS
gulp.task('uglify', ['uglify:foundation', 'uglify:app', 'uglify:controllers', 'uglify:services'])

gulp.task('uglify:foundation', function(cb) {
  var uglify = $.if(isProduction, $.uglify()
    .on('error', function (e) {
      console.log(e);
    }));

  return gulp.src(paths.foundationJS)
    .pipe(uglify)
    .pipe($.concat('foundation.js'))
    .pipe(gulp.dest('./ClientApp/build/assets/js/'))
  ;
});


gulp.task('uglify:app', function() {
var uglify = $.if(isProduction, $.uglify()
  .on('error', function (e) {
    console.log(e);
  }));
  return gulp.src(paths.appJS)
    .pipe(uglify)
    .pipe($.concat('app.js'))
    .pipe(gulp.dest('./ClientApp/build/assets/js/'))
  ;
});

gulp.task('uglify:controllers', function() {
var uglify = $.if(isProduction, $.uglify()
  .on('error', function (e) {
    console.log(e);
  }));
  return gulp.src(paths.ctrJS)
    .pipe(uglify)
    .pipe($.concat('controllers.js'))
    .pipe(gulp.dest('./ClientApp/build/assets/js/'))
  ;
});

gulp.task('uglify:services', function() {
var uglify = $.if(isProduction, $.uglify()
  .on('error', function (e) {
    console.log(e);
  }));
  return gulp.src(paths.srvJS)
    .pipe(uglify)
    .pipe($.concat('services.js'))
    .pipe(gulp.dest('./ClientApp/build/assets/js/'))
  ;
});

// Starts a test server, which you can view at http://localhost:8079
gulp.task('server', ['build'], function() {
  gulp.src('./ClientApp/build')
    .pipe($.webserver({
      port: 8079,
      host: 'localhost',
      fallback: 'index.html',
      livereload: true,
      open: true
    }));
  exec('nodemon ServerApp/server.js', function (err, stdout, stderr) {
    console.log('Started Server App');
    console.log(stdout);
    console.log(stderr);
  });
 /* exec('C:/mongodb-win32-x86_64-3.0.3/bin/mongod.exe', function (err, stdout, stderr) {
    console.log('Started MongoDB server');
    console.log(stdout);
    console.log(stderr);
  });*/
});

// Starts a test server, which you can view at http://localhost:8079
gulp.task('serverClient', ['build'], function() {
  gulp.src('./ClientApp/build')
    .pipe($.webserver({
      port: 8079,
      host: 'localhost',
      fallback: 'index.html',
      livereload: true,
      open: true
    }));
});

// Builds your entire app once, without starting a server
gulp.task('build', function(cb) {
  sequence('clean', ['copy', 'copy:foundation', 'sass', 'uglify'], 'copy:templates', cb);
});

// Default task: builds your app, starts a server, and recompiles assets when they change
gulp.task('default', ['server'], function () {
  // Watch Sass
  gulp.watch(['./ClientApp/client/assets/scss/**/*', './scss/**/*'], ['sass']);

  // Watch JavaScript
  gulp.watch(['./ClientApp/client/assets/js/**/*', './js/**/*'], ['uglify:app']);
  
  gulp.watch(['./ClientApp/client/assets/js/**/*', './js/controllers/**/*'], ['uglify:controllers']);

  gulp.watch(['./ClientApp/client/assets/js/**/*', './js/services/**/*'], ['uglify:services']);

  // Watch static files
  gulp.watch(['./ClientApp/client/**/*.*', '!./client/templates/**/*.*', '!./ClientApp/client/assets/{scss,js}/**/*.*'], ['copy']);

  // Watch app templates
  gulp.watch(['./ClientApp/client/templates/**/*.html'], ['copy:templates']);
});
