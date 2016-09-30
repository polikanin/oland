var gulp = require('gulp');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var del = require('del');
var wiredep = require('wiredep').stream;
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var ftp = require('gulp-ftp');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

//имена папок Разработки
var style = 'style';
var script = 'script';
var fonts = 'fonts';
var image = 'image';

//имя папки на хосте
var host_src = 'oland'; 

//имена папок Сборки
var build_fonts = 'fonts';
var build_image = 'image';

gulp.task('sass', function() {
    return gulp.src(style + '/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(style));
});

gulp.task('img', function () {
    return gulp.src(image + '/**/*')
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            une: [pngquant()]
        }))
        .pipe(gulp.dest('dist/' + build_image));
});

gulp.task('watch', function () {
    gulp.watch(style + '/sass/*.scss', ['sass']);
    gulp.watch('bower.json', ['bower']);
});

gulp.task('clean', function () {
    return del.sync('dist');
});

gulp.task('tinypng', function () {
    gulp.src(image + '/**/*')
        .pipe(tinypng())
        .pipe(gulp.dest('dist/' + build_image));
});

gulp.task('files', function () {
    gulp.src(fonts + '/**/*')
        .pipe(gulp.dest('dist/' + build_fonts));
    gulp.src('*.php')
        .pipe(gulp.dest('dist/'));

});

gulp.task('bower', function () {
    gulp.src('./index.html')
        .pipe(wiredep({
            optional: 'configuration',
            goes: 'here'
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('build', ['clean', 'files', 'img'], function () {
    return gulp.src('*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cleanCSS()))
        .pipe(gulpif('*.html', htmlmin({collapseWhitespace: true})))
        .pipe(gulp.dest('dist'));
});

gulp.task('deploy', ['build'], function () {
    return gulp.src('dist/**/*')
        .pipe(ftp({
            host: '87.236.19.39',
            user: 'kononobs_tolik',
            pass: 'Gangybasm107',
            remotePath: '/beymax.ru/public_html/demo/' + host_src
        }))
});

gulp.task('default', ['sass', 'watch', 'bower']);