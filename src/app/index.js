/**
 * 入口文件
 */

'use strict';
import 'framework7';
import 'framework7/dist/css/framework7.ios.min.css';
import 'framework7/dist/css/framework7.ios.colors.min.css';
import '../assets/app.less';
import 'babel-polyfill';
import Router from './router';
import { initI18n } from '../utils/i18n';
import Constant from '../utils/constant';

let app = {
  init() {
    window.$ = Dom7;
    window.myApp = new Framework7({
      material: false,
      pushState: true,
      swipeBackPage: false,
      onAjaxStart: function (xhr) {
        myApp.showIndicator();
      },
      // ajax请求完毕
      onAjaxComplete: function (xhr) {
        myApp.hideIndicator();
      }
    });
    window.mainView = myApp.addView('.view-main', {
      domCache: false,
    });

    let lng = localStorage.getItem(Constant.LNG) || 'zh-CN';
    window.polyglot = initI18n(lng);
    $('#app-name').html(polyglot.t('appName'));
    Router.init();
  },
  // 如果需要调用cordova 需要在deviceReady后 调用 mainModule.init()
  deviceReady() {
    document.addEventListener('deviceready', function() {
      // 绑定返回事件
      document.addEventListener("backbutton", function(){
        app.cordovaBackEvent();
      }, false);
    }, false);
  },
  cordovaBackEvent() {
    // 物理返回事件
  }
};
app.init();
