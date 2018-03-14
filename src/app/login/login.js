/**
 * login.js业务逻辑
 **/

'use strict';
import loginTpl from './login.tpl.html';
import Tool from '../utils/tool';
import '../components/toast/toast.css'
import '../components/toast/toast'
import './login.less'

export default {
  init(page) {
    let loginTPl = Tool.renderTpl(loginTpl);
    $('.login-page').append($(loginTPl));
    this.log();
  },
  log() {
    $('.loginHref').on('click', function() {
      let toast = myApp.toast('账号密码错误！');
      toast.show();
    })
  }
}
