const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const header = require('gulp-header');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer'); // A Gulp plugin for passing through only those source files that are newer than corresponding destination files
const clean = require('gulp-clean');
const pkg = require('./package.json');
const concat = require('gulp-concat');

// Set the banner content
var banner = ['/*!\n',
    ' * Southern Teachers Theme - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' */\n',
    ''
].join('');

// Clean dist
// gulp.task('clean', function() {
//     return gulp.src(['Content', 'js', 'Styles'], { read: false })
//         .pipe(clean());
// });

// Compiles SCSS files from /scss into /css
// NOTE: This theme uses LESS by default. To swtich to SCSS you will need to update this gulpfile by changing the 'less' tasks to run 'sass'!
gulp.task('sass', function() {
    return gulp.src('assets/scss/Site.scss')
        .pipe(sass())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify compiled CSS
// gulp.task('minify-css', ['sass'], function() {
//     return gulp.src('assets/css/Site.css')
//         .pipe(cleanCSS({ compatibility: 'ie8' }))
//         .pipe(rename({ suffix: '.min' }))
//         .pipe(gulp.dest('Styles/css'))
//         .pipe(browserSync.reload({
//             stream: true
//         }))
// });

// Minify JS
// gulp.task('minify-js', function() {
//     return gulp.src('assets/js/scripts.js')
//         .pipe(uglify())
//         .pipe(header(banner, { pkg: pkg }))
//         .pipe(rename({ suffix: '.min' }))
//         .pipe(gulp.dest('js'))
//         .pipe(browserSync.reload({
//             stream: true
//         }))
// });

// Copy vendor libraries from /node_modules into /vendor
// gulp.task('copy', function() {
//     gulp.src(['assets/js/**/*'])
//         .pipe(gulp.dest('js'));
//     gulp.src(['assets/fonts/**/*'])
//         .pipe(gulp.dest('Styles/css/fonts'));
// })

// Image minification
// gulp.task('image', () => {
//     let out = 'Content/Images';
//     return gulp.src('assets/img/**/*')
//         .pipe(newer(out))
//         .pipe(imagemin({ optimizationLevel: 5 }))
//         .pipe(gulp.dest(out))
//         .pipe(browserSync.reload({
//             stream: true
//         }));
// });

// Run everything
//gulp.task('default', ['sass', 'image', 'minify-css', 'minify-js', 'copy']);


// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: ''
        },
    })
})

// Dev task with browserSync
// gulp.task('dev', ['browserSync', 'sass', 'image', 'minify-css', 'minify-js', 'watch'], function() {
//     // Reloads the browser whenever HTML or JS files change
//     gulp.watch('*.html', browserSync.reload);
//     gulp.watch('js/**/*.js', browserSync.reload);
// });

gulp.task('default', ['browserSync', 'sass', 'watch']);

gulp.task('watch', function(){
    gulp.watch('css/custom.css', browserSync.reload);
    gulp.watch('js/*.js', browserSync.reload);
});

// gulp.task('watch', function()
//     gulp.watch('assets/scss/*.scss', ['sass']);
//     //gulp.watch('Styles/css/*.css', ['minify-css']);
//     gulp.watch('assets/js/*.js', ['minify-js']);
//     gulp.watch('assets/img', ['image']);
// });