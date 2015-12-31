/**
 * 组件安装
 * npm install gulp-util gulp-imagemin gulp-ruby-sass gulp-minify-css gulp-jshint gulp-uglify gulp-rename gulp-concat gulp-clean gulp-livereload tiny-lr --save-dev
 */

// 引入 gulp及组件
var gulp = require('gulp'),
    rev = require('gulp-rev-append'),
    autoprefixer = require('gulp-autoprefixer'),
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),
    connect = require('gulp-connect'),
   //concat = require('gulp-concat'),
   //  imagemin = require('gulp-imagemin'),
     cssmin = require('gulp-minify-css'),
    htmlmin = require('gulp-htmlmin');
var path = {
  src   : "src/",
  css   : "src/css/",
  js    : "src/js/",
  /*scss  : "shake/scss/",*/
  img   : "src/images/",
  build : "build"
}
/*gulp.task('concat', function () {
    gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'));
});*/
 
gulp.task('jsmin', function () {
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('testCssmin', function () {
    gulp.src('dist/css/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'));
});
//gulp.task('testImagemin', function () {
//   gulp.src('src/image/*.{png,jpg,gif,ico}')
//        .pipe(imagemin())
//        .pipe(gulp.dest('dist/image'));
//});

gulp.task('testHtmlmin', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('dist/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/'));
});

gulp.task('testRev',function(){
    gulp.src('src/*.html')
        .pipe(rev())
        .pipe(gulp.dest('dist/'));
       
})
gulp.task('testLess', function () {
    gulp.src('src/css/style.less')
        .pipe(less())
        .pipe(gulp.dest('src/css'));
});
gulp.task('default', [/*'concat',*/ 'jsmin','testCssmin',/*'testHtmlmin',*/'testRev','AutoFx']);
gulp.task('AutoFx', function () {
    gulp.src('src/css/style.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(gulp.dest('dist/css'));
});
gulp.task('watch', function() {
    gulp.watch(path.src + '**/*.*',['reload-dev','testLess']);
});

gulp.task('connectDev', function() {
  connect.server({
    root: path.src,
    port: 8000,
    livereload: true
  });
});

//reload server
gulp.task('reload-dev',function() {
  gulp.src(path.src + '**/*.*')
    .pipe(connect.reload());
});
//测试服务器
gulp.task('run', ['connectDev', 'watch','testLess']);