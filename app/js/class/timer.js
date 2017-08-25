/*
 * @Author: chestnut_647 
 * @Date: 2017-08-21 16:23:27 
 * @Last Modified by: chestnut_647
 * @Last Modified time: 2017-08-25 11:05:53
 */
class Timer {
  countdown(end, update, handle) {
    const now = Date.now();
    const self = this;
    // 时间到
    if(now - end) {
      handle.call(self);
    } else {
      const px_d = 1000*60*60*24;
      const px_h = 1000*60*60;
      const px_m = 1000*60;
      const px_s = 1000;
      let last_time = now - end;
      // 剩余天数、小时、分钟、秒
      let d = Math.floor(last_time / px_d);
      let h = Math.floor((last_time - d*px_d) / px_h);
      let m = Math.floor((last_time - d*px_d - h*px_h) / px_m);
      let s = Math.floor((last_time - d*px_d - h*px_h - m*px_m) / px_s);
      let res = [];
      if(d > 0) {
        res.push(`<em>${d}</em>天`)
      }
      if(res.length || h > 0) {
        res.push(`<em>${h}</em>时`)
      }
      if(res.length || m > 0) {
        res.push(`<em>${m}</em>分`)
      }
      if(res.length || s > 0) {
        res.push(`<em>${s}</em>秒`)
      }
      self.last_time  = res.join('');
      update.call(self, res.join(''));
      setTimeout(function() {
        selef.countdown(end, update,handle);
      }, 1000);
    }
  }
}
export default Timer;