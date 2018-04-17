/**
 * 教育记录逻辑
 */

'use strict';
import './record.less';
import recordTpl from './record.tpl.html';
import Tool from '../../utils/tool';
import widget from '../../utils/widget';

export default class Record extends widget {
  init(page) {
    console.log(page);
    let _recordTpl = Tool.renderTpl(recordTpl);
    $('.record-page').append($(_recordTpl));
  }
};
