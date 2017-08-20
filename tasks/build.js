import gulp from 'gulp';

import gulpSequence from 'gulp-sequence';
// js 模板都需要先处理
gulp.task('build', gulpSequence('clean', 'css', 'pages', 'scripts', ['browser', 'serve']));