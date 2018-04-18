/**
 * 投诉及建议逻辑
 */

'use strict';
import './complaint.less';
import complaintTpl from './complaint.tpl.html';
import Tool from '../../utils/tool';
import widget from '../../utils/widget';

export default class Complaint extends widget {
  init(page) {
    let _complaintTpl = Tool.renderTpl(complaintTpl);
    $('.complaint-page').append($(_complaintTpl));
  }
};
