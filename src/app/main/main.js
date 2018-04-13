/**
 * 首页逻辑
 */

'use strict';
import './main.less';
import mainTpl from './main.tpl.html';
import Tool from '../../utils/tool';
import sto from '../../store/main_store'

export default {
  init() {
    let self = this;
    let _mainTpl = Tool.renderTpl(mainTpl,{
      score: '您的风险问卷调查得分为',
    });
    $('.main-page').append($(_mainTpl));
    self.ajaxMoney();
  },
  /*
   获取资产概况
   */
  ajaxMoney() {
    sto.contactInfo({
      data: {
        page: 1,
        pagesize: 10,
      }
    }, function(res){
      console.log(res);
    })
  }
};
