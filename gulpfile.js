var gulp = require('gulp');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');

var paths = {
  resources: {
    src: [
      // PLUGIN: socicon font
      './node_modules/socicon/fon*/*.*',
      // VENDOR PLUGIN: Icons Mind
      './src/fon*/iconsmind.*',
      // Image resources
      './src/im*/**/*.*',
      // PHP files
      './src/ph*/**/*.*',
      // HTML files
      './src/*.html',
    ],
    srcWatch: ['./src/img/**/*.*', './src/php/**/*.*', './src/*.html'],
    dest: './dist'
  },
  styles: {
    src: './src/less/app.less',
    srcWatch: ['./src/less/**/*.less', './src/css/*.css'],
    dest: './dist/css'
  },
  scripts: {
    src: [
      // Pillar theme dependencies
      './node_modules/jquery/dist/jquery.js',
      './node_modules/owl.carousel/dist/owl.carousel.js',
      // './src/js/owl.carousel.min.js',
      './node_modules/smooth-scroll/dist/smooth-scroll.js',
      './node_modules/jquery-parallax.js/parallax.js',
      './node_modules/scrollreveal/dist/scrollreveal.js',
      // Pillar theme vendor scripts
      './src/js/vendor/scripts.js',
      './src/js/vendor/parallax.js',
      // Petr's modules
      './src/js/app-modules/navbar.js',   
      './src/js/app.js'
    ],
    srcWatch: './src/js/**/*.js',
    dest: './dist/js'
  }
};

// Copy image resources
gulp.task('copy', function () {
  return gulp
    .src(paths.resources.src)
    .pipe(gulp.dest(paths.resources.dest));
});

// Compile styles
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });

gulp.task('styles', function(){
  return gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(less({
      plugins: [autoprefix]
    }))
    .pipe(rename({ basename: 'app' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles.dest));
});

gulp.task('styles-prod', function(){
  return gulp
    .src(paths.styles.src)
    .pipe(less({
      plugins: [autoprefix]
    }))
    .pipe(cleanCSS())
    .pipe(rename({ basename: 'app' }))
    // .pipe(rename({ basename: 'schoolology', suffix: '.min' }))
    .pipe(gulp.dest(paths.styles.dest));
});


// Compile scripts

gulp.task('scripts', function() {
  return gulp
    .src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('scripts-prod', function() {
  return gulp
    .src(paths.scripts.src)
    .pipe(concat('app.js'))
    // .pipe(concat('schoolology.min.js'))
    .pipe(uglify()).on('error', function(err) {
      console.log(err.toString());
    })
    .pipe(gulp.dest(paths.scripts.dest));
});

// Watch styles and scripts change
gulp.task('watch', function () {
  gulp.watch(paths.resources.srcWatch, ['copy'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
  gulp.watch(paths.styles.srcWatch, ['styles'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
  gulp.watch(paths.scripts.srcWatch, ['scripts'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('production', ['copy', 'styles-prod', 'scripts-prod']);
gulp.task('development', ['copy', 'styles', 'scripts']);
gulp.task('default', ['development', 'watch']);
