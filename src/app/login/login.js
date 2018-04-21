/**
 * 登录业务逻辑
 */

'use strict';
import './login.less';
import loginTpl from './login.tpl.html';
import Tool from '../../utils/tool';
import widget from '../../utils/widget';

export default class Complaint extends widget {
  static defaultHtml = {
    tem: `<div style="text-align: left;">尊敬的投资者</div>`
  };
  init(page) {
    let _loginTpl = Tool.renderTpl(loginTpl);
    $('.login-page').append($(_loginTpl));
    
    myApp.modal({
      title: '风险提示',
      text: Complaint.defaultHtml.tem,
      buttons: [
        {
          text: '已知悉，继续浏览',
          onClick: function() {
            myApp.loginScreen();
          }
        },
      ],
    })
  }
};
