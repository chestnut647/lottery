/*
 * @Author: chestnut_647 
 * @Date: 2017-08-23 09:03:44 
 * @Last Modified by: chestnut_647
 * @Last Modified time: 2017-08-25 15:02:17
 * @description: 用来存取玩法奖金等基本信息（基本信息共享）
 */
import $ from 'jquery';

class Base {
/** 
 * [initPlayList] 用来建立存储跟玩法相关内容的数据结构
 */
  initPlayList() {
    this.play_list.set('r2', {
      bonus: 2,
      tip: '从01～11中任选2个或多个号码，所选号码与开奖号码相同，即中奖<em class="red">6</em>元',
      name: '任二'
    })
    .set('r3', {
      bonus: 19,
      tip: '从01～11中任选3个或多个号码，所选号码与开奖号码相同，即中奖<em class="red">19</em>元',
      name: '任三'
    })
 
    .set('r4', {
      bonus: 78,
      tip: '从01～11中任选3个或多个号码，所选号码与开奖号码相同，即中奖<em class="red">78</em>元',
      name: '任四'
    })
    .set('r5', {
      bonus: 540,
      tip: '从01～11中任选3个或多个号码，所选号码与开奖号码相同，即中奖<em class="red">540</em>元',
      name: '任五'
    })
    .set('r6', {
      bonus: 90,
      tip: '从01～11中任选3个或多个号码，所选号码与开奖号码相同，即中奖<em class="red">90</em>元',
      name: '任六'
    })
    .set('r7', {
      bonus: 26,
      tip: '从01～11中任选3个或多个号码，所选号码与开奖号码相同，即中奖<em class="red">26</em>元',
      name: '任七'
    })
    .set('r8', {
      bonus: 9,
      tip: '从01～11中任选3个或多个号码，所选号码与开奖号码相同，即中奖<em class="red">9</em>元',
      name: '任八'
    });
  }
  initNumber() {
    for(let i=1; i<12; i++) {
      this.number.add((i+'').padStart(2, '0'));
    }
  }
  setOmit(omit) {
    let self = this;
    self.omit.clear();
    for(let [index, item] of omit.entries()) {
      self.omit.set(index, item);
    }
    $(self.omit_el).each(function(index, item) {
      $(item).text(self.omit.get(index));
    })
  }
  setOpenCode(code) {
    let self = this;
    self.open_code.clear();
    for(let item of code.values()) {
      self.open_code.add(item);
    }
    self.updateOpenCode&&self.updateOpenCode.call(self, code);
  }
  toggleCodeActive(e) {
    let self = this;
    let $cur = $(e.currentTarget);
    $cur.toggleClass('btn-boll-active');
    self.getCout();
  }
  changePlayNav(e) {
    let self = this;
    let $cur = $(e.currentTarget);
    $cur.addClass('active').siblings().removeClass('active');
    self.cur_play = $cur.attr('desc').toLocaleLowerCase();
    $('#zx_sm span').html(self.play_list.get(self.cur_play).tip);
    $('.boll-list .btn-boll').removeClass('btn-boll-active');
    self.getCout();
  }
/** 
 * [assignHandle] 处理操作区
 */
  assignHandle(e) {
    e.preventDefault();
    let self = this;
    let $cur = $(e.currentTarget);
    let index = $cur.index();
    $('.boll-list .btn-boll').removeClass('btn-boll-active');
    if(index === 0) {
      $('.boll-list .btn-boll').addClass('btn-boll-active');
    }
    if(index === 1) {
      $('.boll-list .btn-boll').each(function(i, t) {
        if(t.textContent - 5 > 0) {
          $(t).addClass('btn-boll-active');
        }
      })
    }
    if(index === 2) {
      $('.boll-list .btn-boll').each(function(i, t) {
        if(t.textContent - 6 < 0) {
          $(t).addClass('btn-boll-active');
        }
      })
    }
    if(index === 3) {
      $('.boll-list .btn-boll').each(function(i, t) {
        if(t.textContent % 2 === 1 ) {
          $(t).addClass('btn-boll-active');
        }
      })
    }
    if(index === 4) {
      $('.boll-list .btn-boll').each(function(i, t) {
        if(t.textContent % 2 === 0 ) {
          $(t).addClass('btn-boll-active');
        }
      })
    }
    self.getCout();
  }
  /** 
   * [getName] 获取当前彩票名称
   */
  getName() {
    return this.name;
  }
  /** 
   * [addCode 添加号码]
   */
  addCode() {
    let self = this;
    // 拿到选中号的集合,text()得到的是拼接的字符串，用match来分割
    let $active = $('.boll-list .btn-boll-active').text().match(/\d{2}/g);
    let active = $active ? $active.length : 0;
    let count= self.computeCount(active, self.cur_play);
    if(count) {
      self.addCodeItem($active.join(''), self.cur_play, self.play_list.get(self.cur_play).name, count);
    }
  }
/**
 * 添加单次号码
  */
  addCodeItem(code, type, typeName, count ) {
    let self = this;
    const tpl =  `
      <li codes="${type}|${code}" bonus = "${count*2}" count="${count}" >
        <div class="code">
          <b>${typeName} ${count}>1 ? '复式' : '单式'</b>
          <b class="em">${code}</b>
          [${count}注， <em class="code-list-money">${count*2}元</em>]
        </div>
      </li>
    `
    $(self.cart_el).append(tpl);
    self.getTotal();
  }

  getCout() {
    let self = this;
    let active =  $('.boll-list .btn-boll-active').length;
    let count = self.computeCount(active, self, self.cur_play);

    let range = self.computeBonus(active, self.cur_play);
    let money = count*2;
    let win1 = range[0] - money;
    let win2 = range[1] - money;
    let tpl;
    let c1 = (win1<0 && win2<0) ? Math.abs(win1): win1;
    let c2 = (win1<0 && win2<0) ? Math.abs(win2): win2;
    if(count === 0) {
      tpl = `您选了 <b class="red">${count}</b> 注，共<b class="red">${count*2}</b>`
    } else if(range[0] === range[1]) {
      tpl = `您选了 <b >${count}</b> 注，共<b >${count*2}</b>元
      <em>若中奖，奖金：
        <strong class="red">${range[0]}</strong>元，
        您将${win1>0?'盈利':'亏损'}
        <strong class="${win1>=0 ? 'red': 'green'}">${Math.abs(win1)}</strong>元
      </em>`
    } else {
      tpl = `您选了 <b >${count}</b> 注，共<b >${count*2}</b>元
      <em>若中奖，奖金：
        <strong class="red">${range[0]}</strong> 至 <strong  class="red">${range[1]}</strong>元
        您将${(win1<0 && win2<0)?'亏损':'盈利'}
        <strong class="${win1 >=0 ? 'red': 'green'}">${c1}</strong>元
        至<strong class="${win1 >=0 ? 'red': 'green'}">${c2}</strong>元
      </em>`
    }
    $('.sel_info').html(tpl);
  }
  getTotal() {
   let count = 0;
   $('.codelist li').each(function(index, item) {
     count += $(item).attr(count)*1;
   })
   $('#count').text(count);
   $('#money').text(money);
  }
/** 
 * [getRandpm] 生成随机的选中数
 * @param [number] num 需要随机生成几个球
 * @return [String] 返回拼接好的字符串
 */
  getRandom(num) {
    let arr = [], index;
    // 临时数组
    let number = Array.from(this.number);
    while(num--) {
      index = Number.parseInt(Math.random() * number.length);
      arr.push(number[index]);
      // 把已经选取过的数组删除，避免重复选择
      number.splice(index, 1);
    }
    return arr.join(' ');
  }
  getRandomCode(e) {
    e.preventDefault();
    let self = this;
    let num = e.currentTarget.getAttribute('count');
    let play = this.cur_play.match(/\d+/g)[0];
    if(num === 0) {
      $(self.cart_el).html('');
    } else {
      for(let i=0; i<num; i++) {
        self.addCodeItem(self.getRandom(play), self.cur_play, self.play_list.get(self.cur_play).name, 1);
      }
    }
  }
}

export default Base;