/*
 * @Author: chestnut_647 
 * @Date: 2017-08-22 10:31:37 
 * @Last Modified by: chestnut_647
 * @Last Modified time: 2017-08-23 16:21:11
 * @description: 跟后端交互得的方法 封装三个接口， 遗漏-开奖号码-当前状态
 */
import $ from 'jquery';

class Interface {
/* 
 * getOmit: 获取遗漏数据
 * @param (string) issue [当前期号]
 * @return ([type]) 
 */
  getOmit(issue) {
    let self = this;
    return new Promise((resolve, reject) => {
      $.ajax({
        url: '/get/omit',
        data: {
          issue: issue
        },
        dataType: 'json',
        success: function(res) {
          self.setOmit(res.data);
          resolve.call(self, res);
        },
        error: function(err) {
          reject.call(self, err);
        }
      })
    })
  }
  /* 
   * getOpenCode 获得开奖码
   * @param (string) issue [当前期号]
   */
  getOpenCode(issue) {
    let self = this;
    return new Promise((resolve, reject) => {
      $.ajax({
        url: '/get/opencode',
        data: {
          issue: issue
        },
        dataType: 'json',
        success: function(res) {
          self.setOpenCode(res.data);
          resolve.call(self, res);
        },
        error: function(err) {
          reject.call(self, err);
        }
      })
    })
  }
/* 
 * getState 获取当前状态
 * @param (string) issue [期号]
 */
  getState(issue) {
    let self = this;
    return new Promise((resolve, reject) => {
      $.ajax({
        url: '/get/state',
        data: {
          issue: issue
        },
        dataType: 'json',
        success: function(res) {
          // 会涉及到期号的更新，不是单纯的保存问题
          // self.setOpenCode(res.data);
          resolve.call(self, res);
        },
        error: function(err) {
          reject.call(self, err);
        }
      })
    })
  }
}

export default Interface;
