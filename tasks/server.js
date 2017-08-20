/*
 * @Author: chestnut_647 
 * @Date: 2017-08-19 14:56:56 
 * @Last Modified by: chestnut_647
 * @Last Modified time: 2017-08-20 19:52:58
 */
import gulp from 'gulp';
import gulpif from 'gulp-if';
// 启动脚本作为服务器
import liveserver from 'gulp-live-server';

import args from './util/args'

gulp.task('serve', (cb)=>{
  if(!args.watch) return cb();

  var server = liveserver.new(['--harmony', 'server/bin/www']);
  server.start();
// 热更新
  gulp.watch(['server/public/**/*.js', 'server/views/**/*.ejs'], function(file) {
    server.notify.apply(server, [file]);
  });
// 服务器重启
  gulp.watch(['server/routes/**/*.js', 'server/app.js'],  function() {
    server.start.bind(server)()
  });
  
})