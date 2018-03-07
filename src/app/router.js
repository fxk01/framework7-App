/**
 * router -> views, viewsJs
 * 路由加载页面及当前逻辑
 */

'use strict';
import detailModule from './detail/detail';
import loginModule from './login/login'
import Utils from './utils/tool';

export default {
  init(){
    let that = this;
    $(document).on('pageBeforeInit', (e) => {
      e.srcElement.innerHTML = Utils.renderTpl(e.srcElement.innerHTML, {});
      that.pageBeforeInit(e.detail.page);
    });
  },
  pageBeforeInit(page){
    switch (page.name) {
      case 'detail':
        detailModule.init(page);
        break;
      case 'login':
        loginModule.init(page);
      default:
        break;
    }
  }
};
