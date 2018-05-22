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
import '../../components/toast/toast.css';
import '../../components/toast/toast';
import ModifyPassStore from '../../store/modifyPass_store';

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

    setTimeout(function () {
      $('.fund-page').remove();
    }, 500);
    $('#savePass').on('click', () => { this.savePassword(); });
  }
  /*
   修改密码
   */
  savePassword() {
    let initialPass = $('.initialPass').val();
    let newPass = $('.newPass').val();
    let newPass2 = $('.newPass2').val();
    let options = {
      duration: 2000,
    };
    if(initialPass.length < 6) {
      let toast = myApp.toast('', `<div>原密码不能小于6位！</div>`, options);
      toast.show();
      return false;
    }
    if(newPass.length < 6) {
      let toast = myApp.toast('', `<div>新密码不能小于6位！</div>`, options);
      toast.show();
      return false;
    }
    if(newPass2.length < 6) {
      let toast = myApp.toast('', `<div>再次输入密码不能小于6位！</div>`, options);
      toast.show();
      return false;
    }
    if(newPass !== newPass2) {
      let toast = myApp.toast('', `<div>新密码不一致！</div>`, options);
      toast.show();
      return false;
    }
    ModifyPassStore.postUpdatePassword({
      data: {
        action: 'UpdatePassword',
        idCard: sessionStorage.getItem('idCard'),
        cId: sessionStorage.getItem('cid'),
        oldPassword: initialPass,
        newPassword: newPass2,
      }
    }, (res) => {
      if(res.result === 'NG') {
        let toast = myApp.toast('', `<div>密码修改失败,请检查原密码是否有误！</div>`, options);
        toast.show();
      } else {
        let toast = myApp.toast('', `<div>密码修改成功！</div>`, options);
        toast.show();
      }
    })
  }
};
