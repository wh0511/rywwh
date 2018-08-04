var gulp = require("gulp");
// 清空文件夹
var clean = require("gulp-clean");
// 处理css
var sass = require("gulp-sass");
//添加浏览器前缀
var autoprefixer = require("gulp-autoprefixer");
// es6 => es5
var babel = require("gulp-babel");
var concat = require('gulp-concat');
var core = require('babel-core');
var preset = require('babel-preset-env');
// 处理 js
// 处理html 合并组件到html页面
var fileInclude = require("gulp-file-include");
// 其他 让任务同步
var runSequence = require("run-sequence");
// 自动保存编译
var browserSync = require("browser-sync");
// 复制静态资源 第三方文件
 
//1 清空文件夹
gulp.task("clean",function(){
    return gulp.src("./dist")
    .pipe(clean());
})
//2 处理css
gulp.task("css", function () {
    return gulp.src("./src/css/**")
      .pipe(sass())
      .pipe(autoprefixer({
        // 主流浏览器的最新的两个版本
        browsers: ['last 2 versions']
      }))
      .pipe(gulp.dest("./dist/css/"));
})
//3 处理js
gulp.task("js",function(){
    return gulp.src("./src/js/**")
    .pipe(babel({
        presets:['env']
    }))
    .pipe(gulp.dest("./dist/js"))
})
//4 处理html
gulp.task("html",function(){
    return gulp.src("./src/pages/**")
    .pipe(fileInclude({
        prefix:"@@",
        basepath:"./src/components"
    }))
    .pipe(gulp.dest("./dist/pages"))
})
// 6 复制第三方静态资源 如 jquery,图片,字体图标等
gulp.task("lib", function () {
    return gulp.src(["./src/lib/**"])
      .pipe(gulp.dest("./dist/lib"));
  })
  // 6 复制第三方静态资源 如 jquery,图片,字体图标等
  gulp.task("static", function () {
    return gulp.src(["./src/static/**"])
      .pipe(gulp.dest("./dist/static"));
  })
//5 其他 让任务同步
gulp.task("default",function(){
    runSequence("clean",["css", "js", "html", "static", "lib"],function () {
        browserSync.init({
          // 服务器设置
          server: {
            // 网站根路径
            baseDir: "./dist",
            // 入口文件
            index: "pages/index.html"
          },
          // 端口号
          port: "8888",
          // 不出现页面提示
          notify: false
        });
        // 5.2 修改之后 自动触发编译
     gulp.watch("./src/css/**", ["css"]).on("change", browserSync.reload);
     gulp.watch("./src/js/**", ["js"]).on("change", browserSync.reload);
     gulp.watch("./src/pages/**", ["html"]).on("change", browserSync.reload);
     gulp.watch("./src/components/**", ["html"]).on("change", browserSync.reload);
    })
})