/*
 * @Author: chestnut_647 
 * @Date: 2017-08-19 14:54:34 
 * @Last Modified by: chestnut_647
 * @Last Modified time: 2017-08-19 14:55:29
 */
import gulp from 'gulp';
import gulpif from 'gulp-if';
import livereload from 'gulp-livereload';
import args from './util/args'

gulp.task('css', ()=>{
  return gulp.src('app/**/*.css')
  .pipe(gulp.dest('server/public'))
})