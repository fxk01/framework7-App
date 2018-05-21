/**
 * 基本信息逻辑
 */

'use strict';
import './modifyPassword.less';
import modifyPasswordHtml from '../../page/modifyPassword.html';
import modifyPasswordTpl from './modifyPassword.tpl.html';
import Tool from '../../utils/tool';
import widget from '../../utils/widget';
import '../../components/user-info/user-info.less';

export default class ModifyPassword extends widget {
  constructor() {
    super();
  }

  init() {
    let viewMainDom = $('.view-main').attr('data-page');
    if(viewMainDom !== 'modifyPassword') {
      $('.view-main').attr('data-page', 'modifyPassword');
      $('.pages').append(modifyPasswordHtml);
      $('.modifyPassword-page').addClass('page-on-center')
    }
    let _modifyPasswordTpl = Tool.renderTpl(modifyPasswordTpl);
    $('.modifyPassword-page').append($(_modifyPasswordTpl));
  }
};
