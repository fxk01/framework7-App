/**
 * 我的逻辑
 */

'use strict';
import './personal.less';
import personalTpl from './personal.tpl.html';
import Tool from '../../utils/tool';

export default class Personal {
  init(page) {
    console.log(page);
    // let _personal = Tool.renderTpl(personalTpl);
    // $('.personal-page').append($(_personal));
  }
};
