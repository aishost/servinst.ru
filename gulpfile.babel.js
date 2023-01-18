//imports
import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';
import autoprefixer from 'gulp-autoprefixer';
import del from "del";
import browserSync from 'browser-sync';
import cleanCSS from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import htmlmin from 'gulp-htmlmin';
import sharpResponsive from "gulp-sharp-responsive";
import size from 'gulp-size';
import ttf2woff2 from 'gulp-ttf2woff2';
import fileinclude from'gulp-file-include';
import svgSprite from 'gulp-svg-sprite';
import svgmin from 'gulp-svgmin';
import replace from 'gulp-replace';
import cheerio from 'gulp-cheerio';
import gulpDeployFtp from 'gulp-deploy-ftp';



// consts
const sass = gulpSass(dartSass);
const paths = {
    allFiles: {
        src: '_src/**/*.*',
        dest: 'www/local/templates/main/',
    },
    styles: {
        src: '_src/scss/**/*.{scss, css, sass}',
        dest: 'www/local/templates/main/css/'
    },
    scripts: {
        src: '_src/js/**/*.js',
        dest: 'www/local/templates/main/js/'
    },
    documents: {
        src: ['_src/*.php', '_src/*.html'],
        dest: 'www/local/templates/main/',
    },
    imgs: {
        src: {
            jpg: ['_src/img/**/*.jpg', '_src/img/**/*.jpeg'],
            png: '_src/img/**/*.png',
        },
        dest: 'www/local/templates/main/img/',
    },
    fonts: {
        src: '_src/fonts/**/*.ttf',
        dest: 'www/local/templates/main/fonts/'
    },
    svg: {
        src: '_src/img/*.svg',
        dest: 'www/local/templates/main/img/',
    },
};

function ftpFunc() {
    gulp.src(paths.allFiles.dest)
        .pipe(gulpDeployFtp({
            remotePath: '/tmp',
            host: 'localhost',
            port: 21,
            user: 'foo',
            pass: 'bar'
        })
            .pipe(gulp.dest(paths.allFiles.dest)));
}

//tasks
function serverFunc() {
    browserSync.init({
        /**server: {
            baseDir: paths.allFiles.dest,
            index: "index.html",
        },**/
        ui: {
            port: 8080,
        },
        proxy: "localhost:8888"
    });
}

function copyFunc() {
    return gulp.src(paths.allFiles.src).pipe(gulp.dest(paths.allFiles.dest))
}

function deleteFunc() {
    return del([paths.allFiles.dest])
}

function fontFunc() {
    return gulp.src(paths.fonts.src)
        .pipe(ttf2woff2())
        .pipe(size())
        .pipe(gulp.dest(paths.fonts.dest))
        .pipe(browserSync.stream());
}

function ScriptFunc() {
    return gulp.src(paths.scripts.src)
        .pipe(sourcemaps.init({largeFile: true}))
        .pipe(babel({
            plugins: ['@babel/transform-runtime'],
            presets: ['@babel/env']
        }))
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(size())
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(browserSync.stream());
}

function StyleFunc() {
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init({largeFile: true}))
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: true
        }))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('./'))
        .pipe(size())
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
}

function jpgFunc() {
    return gulp.src(paths.imgs.src.jpg)
        .pipe(sharpResponsive({
            /** includeOriginalFile: true,  if need to use original file **/
            formats: [
                { format: "webp", quality: 75},
                { format: "avif"},
            ]
        }))
        .pipe(size())
        .pipe(gulp.dest(paths.imgs.dest))
        .pipe(browserSync.stream());
}

function pngFunc() {
    return gulp.src(paths.imgs.src.png)
        .pipe(sharpResponsive({
            /** includeOriginalFile: true,  if need to use original file **/
            formats: [
                { format: "webp", quality: 80},
            ]
        }))
        .pipe(size())
        .pipe(gulp.dest(paths.imgs.dest))
        .pipe(browserSync.stream());
}

function svgFunc() {
    return gulp.src(paths.svg.src)
        .pipe(svgmin())
        .pipe(cheerio({
            function ($) {
                $('[fill]').removeAttribute('fill');
                $('[stroke]').removeAttribute('stroke');
                $('[style]').removeAttribute('style');
            },
        }))
        .pipe(replace('&gt;', '>'))
        .pipe(svgSprite({
            mode:{
                symbol:{
                    sprite: "sprite.svg"
                }
            }
        }))
        .pipe(gulp.dest(paths.svg.dest))
}

function HTMLFunc() {
    return gulp.src(paths.documents.src)
        .pipe(fileinclude({
            prefix: '@@',
            /**basepath: '@file'**/
        }))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(size())
        .pipe(gulp.dest(paths.documents.dest))
        .pipe(browserSync.stream());
}

function watchFunc() {
    gulp.watch(paths.scripts.src, ScriptFunc);
    gulp.watch(paths.styles.src, StyleFunc);
    gulp.watch(paths.imgs.src.jpg, jpgFunc);
    gulp.watch(paths.imgs.src.png, pngFunc);
    gulp.watch(paths.documents.src, HTMLFunc);
    gulp.watch(paths.svg.src, svgFunc)
}

const defaultTask = gulp.series(deleteFunc, copyFunc, gulp.parallel(HTMLFunc ,fontFunc, ScriptFunc, StyleFunc, gulp.parallel(svgFunc, jpgFunc, pngFunc,), ), gulp.parallel(serverFunc, watchFunc,),);

gulp.task('delete', deleteFunc)
gulp.task('img', jpgFunc)
gulp.task('default', defaultTask)
gulp.task('ftp', ftpFunc)