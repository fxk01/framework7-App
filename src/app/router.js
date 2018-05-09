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
import mainModule from './main/main';
import Utils from '../utils/tool';

export default {
  init() {
    let that = this;
    $(document).on('pageBeforeAnimation', (e) => {
      console.log(e.detail.page.name);
      e.srcElement.innerHTML = Utils.renderTpl(e.srcElement.innerHTML, {});
      that.pageBeforeInit(e.detail.page);
    });
  },
  pageBeforeInit(page) {
    myApp.closeModal('.modal-main');
    myApp.closeModal('.modal-login');
    if(page.name !== null) {
      myApp.closeModal('.login-screen');
    }
    switch (page.name) {
      case 'index':
        new mainModule().init(page);
        break;
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
