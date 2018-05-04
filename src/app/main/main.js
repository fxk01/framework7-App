/**
 * 首页逻辑
 */

'use strict';
import './main.less';
import mainTpl from './main.tpl.html';
import Tool from '../../utils/tool';
import widget from '../../utils/widget'

export default class Main extends widget {
  constructor() {
    super();
  }
  init() {
    let _mainTpl = Tool.renderTpl(mainTpl);
    $('.main-page').append($(_mainTpl));

    myApp.prompt('', '', function (value) {
      myApp.alert('Your name is "' + value + '". You clicked Ok button');
    });
  }
};
