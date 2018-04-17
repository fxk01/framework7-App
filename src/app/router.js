/**
 * router -> views, viewsJs
 * 路由加载页面及当前逻辑
 */

'use strict';
import {
  Personal
} from './page';
import Utils from '../utils/tool';

export default {
  init() {
    let that = this;
    $(document).on('pageBeforeInit', (e) => {
      e.srcElement.innerHTML = Utils.renderTpl(e.srcElement.innerHTML, {});
      that.pageBeforeInit(e.detail.page);
    });
  },
  pageBeforeInit(page) {
    switch (page.name) {
      case 'personal':
        new Personal().init(page);
        break;
      default:
        break;
    }
  }
};
