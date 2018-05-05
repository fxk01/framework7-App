/**
 * 首页逻辑
 */

'use strict';
import './main.less';
import mainTpl from './main.tpl.html';
import companyList from '../../components/company-list/company-list.html'
import Tool from '../../utils/tool';
import widget from '../../utils/widget'

export default class Main extends widget {
  constructor() {
    super();
  }
  init() {
    let _mainTpl = Tool.renderTpl(mainTpl);
    $('.main-page').append($(_mainTpl));
    myApp.prompt('', '');
    $('.modal-text-input').attr('placeholder', '请输入公司名称');
    $('.modal').append(companyList);
  }
};
