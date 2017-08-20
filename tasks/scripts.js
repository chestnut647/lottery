/*
 * @Author: chestnut_647 
 * @Date: 2017-08-19 14:48:15 
 * @Last Modified by: chestnut_647
 * @Last Modified time: 2017-08-20 19:32:06
 */
import gulp from 'gulp';
import gulpif from 'gulp-if';
import concat from 'gulp-concat';
import webpack from 'webpack';
// gulp是基于stream
import gulpWebpack from 'webpack-stream';
// 文件重命名做标记的
import named from 'vinyl-named';
// 文件重命名
import rename from 'gulp-rename';
import livereload from 'gulp-livereload';
import plumber from 'gulp-plumber';
// js css压缩的
import uglify from 'gulp-uglify';
// 命令行工具输出
import {log, colors} from 'gulp-util';
import args from './util/args'
// 打开-错误处理-重命名-webpack重新编辑-存到指定位置（未压缩）-文件重命名-重新压缩-重新保存目录（压缩）-热更新

gulp.task('scripts', () => {
  // 返回一个 Vinyl files 的 stream 它可以被 piped 到别的插件中。
  // 不加return的话，task和里面的gulp流是异步执行的
  return gulp.src(['app/js/index.js'])
  // 改变默认处理错误的机制
    .pipe(plumber({
      errorHandler: function() {

      }
    }))
    .pipe(named())
    .pipe(gulpWebpack({
      module: {
        loaders:[{
          test: /\.js$/,
          loader: 'babel-loader'
        }]
      }
    }), null, (err, stats) => {
      log(`Finished '${colors.cyan("scripts")}'`, stats.toString({
        chunks: false
      }))
    })
    .pipe(gulp.dest('server/public/js'))
    .pipe(rename({
      basename: 'cp',
      extname: '.min.js'
    }))
    .pipe(uglify({compress:{properties: false}, output: {"quote_keys": true}}))
    .pipe(gulp.dest('server/public/js'))
    .pipe(gulpif(args.watch, livereload()))
})