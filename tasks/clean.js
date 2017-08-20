/*
 * @Author: chestnut_647 
 * @Date: 2017-08-19 15:12:51 
 * @Last Modified by: chestnut_647
 * @Last Modified time: 2017-08-19 15:13:58
 */
import gulp from 'gulp';
import del from 'del';
import args from './util/args';

gulp.task('clean', () => {
  return del(['server/public', 'server/views'])
})