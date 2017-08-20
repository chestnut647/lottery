/*
 * @Author: chestnut_647 
 * @Date: 2017-08-19 14:51:29 
 * @Last Modified by: chestnut_647
 * @Last Modified time: 2017-08-19 15:32:49
 */
import gulp from 'gulp';
import gulpif from 'gulp-if';
import livereload from 'gulp-livereload';
import args from './util/args'

gulp.task('pages', ()=>{
  return gulp.src('app/**/*.ejs')
    .pipe(gulp.dest('server'))
    .pipe(gulpif(args.watch, livereload()))
})