// Gulp
const {src, dest, series, watch, parallel, task} = require('gulp')

var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');

// del
var del = require('del');

// CSS related plugins
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

// JS related plugins
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

// browser-sync
var browserSync = require('browser-sync').create();

// gulp-jade
var jade = require('gulp-jade');

// html variables
var jadeWatch = 'src/template/*.jade';
var jadeSRC = 'src/template/*.jade';
var jadeDIST = './dist/';

// styles variables
var styleSRC = 'src/scss/style.scss';
var styleDIST = './dist/css/';
var styleWatch = 'src/scss/**/*.scss';

// js variables
var jsSRC = 'script.js';
var jsFolder = 'src/js/';
var jsDIST = './dist/js/';
var jsWatch = 'src/js/**/*.js';
var jsFILES = [jsSRC];
var uglify = require('gulp-uglify');

// browser-sync task
function browser_sync() {
    browserSync.init({
        server: {
            baseDir: './dist/'
        }
    });
}

// reload task
function reload(done) {
    browserSync.reload();
    done();
}

// jade task
function compile_jade(done) {
    src(jadeSRC)
        .pipe(jade({
            pretty: true
        }))
        .pipe(dest(jadeDIST));

        done();
}

// style task
function compile_css(done) {
    src(styleSRC)
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'compressed'
        }))
        .on('error', console.error.bind(console))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(dest(styleDIST))
        .pipe(browserSync.stream());

        done();
}

// js task
function compile_javascript(done) {
    jsFILES.map(function(entry) {
        return browserify({
            entries: [jsFolder + entry]
        })
        .transform(babelify, {
            presets: ['@babel/preset-env']
        })
        .bundle()
        .pipe(source(entry))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(buffer())
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(dest(jsDIST))
        .pipe(browserSync.stream());
    });

    done();
}

// register tasks
task('jade', compile_jade);
task('style', compile_css);
task('js', compile_javascript);
task('browser-sync', browser_sync);

// default task
task('default', parallel('jade', 'style', 'js'));

// watch
function gulp_watch() {
    watch(styleWatch, series(compile_css, reload));
    watch(jsWatch, series(compile_javascript, reload));
    watch(jadeWatch, series(compile_jade, reload))
}

// Clean Task
function clean() {
    return del(['dist/*']);
}

// Build
task('build', series(clean, 'default'));

// Watch
task('watch', parallel('default', parallel(browser_sync,  gulp_watch)));