const gulp = require('gulp');
const { src, dest, watch, series, parallel } = require('gulp');
const gulpSass = require('gulp-sass')(require('sass'));
const cssNano = require('cssnano');
const autoprefixer = require('gulp-autoprefixer');
const minify = require('gulp-minify-css');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const gulpClean = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
// import imagemin from 'gulp-imagemin';
const del = require('del');
const gulpCleanCss = require('gulp-clean-css');

// import pkg from 'gulp'
// const { gulp, src, dest, parallel, series, watch } = pkg
// import dartSass from 'sass';
// import gulpSass from 'gulp-sass';
// const sass = gulpSass(dartSass);
// import cssNano from 'cssnano';
// import autoprefixer from 'gulp-autoprefixer';
// import minify from 'gulp-minify-css';
// import concat from 'gulp-concat';
// import uglify from 'gulp-uglify';
// import gulpClean from 'gulp-clean-css';
// import sourcemaps from 'gulp-sourcemaps';
// import sync from 'browser-sync';
// const browserSync = sync.create();
// import imagemin from 'gulp-imagemin';
// import del from 'del';
// import gulpCleanCss from 'gulp-clean-css';

const paths =  {
    html: {
        src: ['./src/*.html'],
        dest: './public'
    },
    imgs: {
        src: ['./src/images/**.jpg', './src/images/**.png', './src/images/**.jpeg'],
        dest: './public/images/'
    },
    svg: {
        src: ['./src/images/svg/*.svg'],
        dest: ['./public/images/svg/']
    },
    style: {
        src: ['./src/styles/**/*.scss'],
        dest: './public/styles/'
    },
    fonts: {
        src: ['./src/fonts/**/*'],
        dest: './public/fonts/'
    },
    scripts: {
        src: ['./src/js/**/*.js'],
        dest: './dist/js/'
    },
    cachebust: {
        src: ['./public/**/*.html'],
        dest: './public/'
    }
}

const html = () => {
    return src(paths.html.src)
        .pipe(dest(paths.html.dest))
        .pipe(browserSync.stream())
}

const fonts = () => {
    return src(paths.fonts.src)
            .pipe(dest(paths.fonts.dest));
}


const styles = () => {
    return src(paths.style.src)
        .pipe(sourcemaps.init())
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(minify())
        .pipe(sourcemaps.write('.'))
        .pipe(dest(paths.style.dest))
        .pipe(browserSync.stream())
}
const images = () => {
    return src(paths.imgs.src)
        // .pipe(imagemin())
        .pipe(dest(paths.imgs.dest))
        .pipe(browserSync.stream())
}

const svg = () => {
    return src(paths.svg.src)
        .pipe(dest(paths.svg.dest))
        .pipe(browserSync.stream())
}

const clean = () => del(['./public']);

const watcher = () => {
    browserSync.init({
        server: {
            baseDir: 'public'
        }
    })
    watch(paths.html.src, html);
    watch(paths.style.src, styles);
    watch(paths.imgs.src, images);
    watch(paths.svg.src, svg);
}

exports.html = html;
exports.styles = styles;
exports.watcher = watcher;
exports.images = images;
exports.default = series(clean, html, svg, images, fonts, styles, watcher);



