/**
 * 交易记录逻辑
 */

'use strict';
import './record.less';
import recordHtml from '../../page/record.html';
import recordTpl from './record.tpl.html';
import Tool from '../../utils/tool';
import widget from '../../utils/widget';

export default class Record extends widget {
  init() {
    let viewMainDom = $('.view-main').attr('data-page');
    if(viewMainDom !== 'record') {
      $('.view-main').attr('data-page', 'record');
      $('.pages').append(recordHtml);
      $('.record-page').addClass('page-on-center')
    }
    let _recordTpl = Tool.renderTpl(recordTpl);
    $('.record-page').append($(_recordTpl));
  }
};
