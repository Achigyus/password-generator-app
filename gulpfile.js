const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function compileSass(cb) {
    cb();
    return src('*.sass')
        .pipe(sass())
        .pipe(dest('dist'));
}

function watchSass() {
    watch(['*.sass'], compileSass);
}

exports.default = series(compileSass, watchSass);