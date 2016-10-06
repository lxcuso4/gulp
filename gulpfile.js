//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    rename = require('gulp-rename');


//定义一个testLess任务（自定义任务名称）
gulp.task('Less', function () {
    var  autoprefixer = require('gulp-autoprefixer'),
         minifycss = require('gulp-minify-css'),
         less = require('gulp-less');
    gulp.src('src/styles/test.less') //该任务针对的文件
        .pipe(less()) //该任务调用的模块
        .pipe(autoprefixer('last 2 version', 'safari 4', 'ie 8', 'ie 9', 'opera 10.5', 'ios 4', 'android 4'))
        .pipe(rename({basename: 'index'}))
        .pipe(gulp.dest('dist/assets/css')) //将会在src/css下生成index.css
        .pipe(minifycss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/assets/css'))
});


var concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    jshintConfig  = require('./package').jshintConfig;

gulp.task('scripts', function() {
    return gulp.src('src/scripts/**/*.js')
        .pipe(concat('main.js'))//合并js文件
        // .pipe(jshint(jshintConfig))//语法检查，package.json中配置
        // .pipe(jshint.reporter('default'))//语法错误提示
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(uglify({
            mangle: {toplevel: true, except: ['liu','log'], keep_fnames: false },
            //混淆变量名,toplevel:混淆变量名，except：配置例外的变量名，keep_fnames:函数名不混型
            compress: true,//类型：Boolean 默认：true 是否完全压缩
            preserveComments: 'all' //保留所有注释
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(notify({ message: 'Scripts task complete' }));//显示报错信息
});

gulp.task('images', function() {
    return gulp.src('src/images/**/*')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('dist/assets/img'))
        .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('default',['Less','scripts','images']); //定义默认任务 elseTask为其他任务，该示例没有定义elseTask任务

//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组)
//gulp.dest(path[, options]) 处理完后文件生成路径