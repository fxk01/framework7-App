/**
 * router -> views, viewsJs
 * 路由加载页面及当前逻辑
 */

'use strict';
import {
  Record,
  Complaint,
  Login,
  Fund,
} from './page';
import Utils from '../utils/tool';

export default {
  init() {
    let that = this;
    $(document).on('pageBeforeInit', (e) => {
      myApp.closeModal('.modal');
      e.srcElement.innerHTML = Utils.renderTpl(e.srcElement.innerHTML, {});
      that.pageBeforeInit(e.detail.page);
    });
    $(document).on('pageBeforeRemove', (e) => {
      myApp.closeModal('.modal');
    });
  },
  pageBeforeInit(page) {
    switch (page.name) {
      case 'record':
        new Record().init(page);
        break;
      case 'complaint':
        new Complaint().init(page);
        break;
      case 'login':
        new Login().init(page);
        break;
      case 'fund':
        new Fund().init(page);
        break;
      default:
        break;
    }
  }
};
