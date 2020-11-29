const { notify } = require('browser-sync');
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browerSync = require('browser-sync').create();

var config = {
    path: {
        scss: './src/scss/**/*.scss',
        html: './public/index.html'
    },
    output:{
        cssName: 'style.min.css',
        path: './public/style',
    }
};

gulp.task('scss', function() {
    return gulp.src(config.path.scss)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(concat(config.output.cssName))
        .pipe(autoprefixer())
        // .pipe(cleanCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.output.path))
        .pipe(browerSync.stream());
});

gulp.task('serve',function(){
    browerSync.init({
        server:{
            baseDir: './public'
        },
        notify : false
    });

    gulp.watch(config.path.scss,gulp.series('scss'))
    gulp.watch(config.path.html).on('change',browerSync.reload);
});
gulp.task('default', gulp.parallel('scss','serve'));