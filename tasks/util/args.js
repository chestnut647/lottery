/*
 * @Author: chestnut_647 
 * @Date: 2017-08-19 14:01:45 
 * @Last Modified by: chestnut_647
 * @Last Modified time: 2017-08-20 19:56:44
 */

//  用于处理命令行参数
import yargs from 'yargs';
// gulp --option  option方法就是用来提取这个参数的
const args = yargs
// production选项是布尔类型，默认为false
  .option('production', {
    boolean: true,
    default: false,
    describe: 'min all scripts'
  })

  .option('watch', {
    boolean: true,
    default: false,
    describe: 'min all scripts'
  })
  // 详细输入命令行执行的日志
  .option('verbose', {
    boolean: true,
    default: false,
    describe: 'log'
  })

  .option('sourcemap', {
    describe: 'force the creation of sourcemaps'
  })
  
  .option('port', {
    string: true,
    default: 8080,
    describe: 'server port'
  })
// 输入命令行的内容用字符串形式处理
  .argv

  export default args;