'use strict';

const { src, dest } = require('gulp');
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const del = require('del');
const gcmq = require("gulp-group-css-media-queries");
const browserSync = require('browser-sync').create();
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const webphtml = require("gulp-webp-html");
const cleancss = require('gulp-clean-css');
const babel = require('gulp-babel');

let project_folder = 'dist';
let source_folder = 'src';

let path = {
    build: {
        html: project_folder + '/',
        css: project_folder + '/css/',
        js: project_folder + '/js/',
        img: project_folder + '/img/',
        fonts: project_folder + '/fonts/'
    },
    src: {
        html: source_folder + '/*.html',
        css: source_folder + '/scss/main.scss',
        js: source_folder + '/js/**/*.js',
        img: source_folder + '/img/*',
        fonts: source_folder + '/fonts/*'
    },
    watch: {
        html: source_folder + '/**/*.html',
        css: source_folder + '/scss/**/*.scss',
        js: source_folder + '/js/**/*.js',
        img: source_folder + '/img/',
        fonts: source_folder + '/fonts/*',
    },
    clean: './' + project_folder + '/*',
};

function browsersync() {
    browserSync.init({
        server: {
            baseDir: "./" + project_folder + '/',
            notify: false
        }
    });
}

function clean() {
    return del(path.clean);
}

function fonts() { 
    return src(path.src.fonts)
            .pipe(dest(path.build.fonts));
}

function html() { 
    return src(path.src.html)
            .pipe(webphtml())
            .pipe(dest(path.build.html))
            .pipe(browserSync.stream());
}

function css() {
    return src(path.src.css)
      .pipe(
        sass({
          outputStyle: "expanded",
        })
      )
      .pipe(
        autoprefixer({
          grid: true,
          overrideBrowserslist: ["last 8 versions"],
          cascade: true,
        })
      )
      .pipe(gcmq())
      .pipe(cleancss())
      .pipe(dest(path.build.css))
      .pipe(browserSync.stream());
}

function images() { 
    return src(path.src.img)
        .pipe(webp())
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(
            imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 3,
            svgoPlugins: [{removeViewBox: false,}],
            })
        )
        .pipe(dest(path.build.img))
        .pipe(browserSync.stream());
        }

function js() {
    return src(path.src.js)
        .pipe(babel({
            presets: ['@babel/env']
        })) 
        .pipe(dest(path.build.js))
        .pipe(browserSync.stream());
}

function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.img], images);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.fonts], fonts);
}

let build = gulp.series(clean, gulp.parallel(html, css, images, js, fonts));
let watch = gulp.parallel(build, watchFiles, browsersync);

exports.images = images;
exports.html = html;
exports.fonts = fonts;
exports.css = css;
exports.build = build;
exports.watch = watch;
exports.default = watch;