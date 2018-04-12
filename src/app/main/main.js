/**
 * 首页逻辑
 */

'use strict';
import './main.less';
import mainTpl from './main.tpl.html';
import Tool from '../utils/tool';

export default {
  init(){
    let that = this;
    let _mainTpl = Tool.renderTpl(mainTpl);
    $('.main-page').append($(_mainTpl));
  }
};
