/*
 * @Author: chestnut_647 
 * @Date: 2017-08-19 15:07:14 
 * @Last Modified by: chestnut_647
 * @Last Modified time: 2017-08-20 19:57:13
 */
import gulp from 'gulp';
import gulpif from 'gulp-if';
import gutil from 'gulp-util';

import args from './util/args'

gulp.task('browser', (cb) => {

  if(!args.watch) return cb();
  gulp.watch('app/**/*.js', ['scripts']);
  gulp.watch('app/**/*.ejs', ['pages']);
  gulp.watch('app/**/*.css', ['css']);
});