var gulp = require('gulp');
var webpack = require("gulp-webpack");
var webpackConfig = require("./webpack.config.js");

gulp.task('webpack', function () {
    var myConfig = Object.create(webpackConfig);
    return gulp
        .src('./app/main.js')
        .pipe(webpack(myConfig))
        .pipe(gulp.dest('./dist'));
});



// 注册缺省任务
gulp.task('default', ['webpack']);