/**
 * login.js业务逻辑
 **/

'use strict';
import './login.less'
import loginTpl from './login.tpl.html';
import Tool from '../utils/tool';

export default {
  init(page){
    let loginTPl = Tool.renderTpl(loginTpl);
    $('.login-page').append($(loginTPl));
  },
}
