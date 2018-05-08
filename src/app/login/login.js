/**
 * 登录业务逻辑
 */

'use strict';
import './login.less';
import '../../components/toast/toast.css';
import '../../components/toast/toast';
import loginTpl from './login.tpl.html';
import Tool from '../../utils/tool';
import widget from '../../utils/widget';
import LoginStore from '../../store/login_store';

export default class Complaint extends widget {
  static defaultHtml = {
    tem: `<div style="text-align: left;">尊敬的投资者</div>`
  };
  init(page) {
    const _cid = page.query.cid;
    if(_cid === undefined) {
      window.location.href = `http://${window.location.host}`;
    } else {
      this.analysisCid(page);
    }
    let _loginTpl = Tool.renderTpl(loginTpl);
    $('.login-page').append($(_loginTpl));
    myApp.modal({
      title: '风险提示',
      text: Complaint.defaultHtml.tem,
      buttons: [
        {
          text: '已知悉，继续浏览',
          onClick: function() {
            myApp.loginScreen();
          }
        },
      ],
    });
    $('.modal').addClass('modal-login');
    $('.login-screen').on('click', '.sdx-link-login', (e) => { this.loginHome(); });
    this.agreementMessage();
  }
  /*
   风险提示说明
   */
  agreementMessage() {
    $('.modal-login .modal-text').addClass('md-lg-ct');
    LoginStore.postAgreementMessage({
      data: {
        action: 'AgreementMessage',
        cid: sessionStorage.getItem('cid'),
        type: 3,
      }
    }, (res) => {
      $('.md-lg-ct').html(res['AgreementMessageList'][0].content);
    })
  }
  /*
   登陆
   */
  loginHome() {
    function validator(target, validator, errorMsg) {
      return new Proxy(target, {
        _validator: validator,
        set(target, key, value, proxy) {
          let errMsg = errorMsg;
          if (value === '') {
            let options = {
              onHide: function () {
                console.log('hidden');
              },
              duration: 2000
            };
            let toast = myApp.toast('', `<div>${errMsg[key]}不能为空！</div>`, options);
            toast.show();
            return target[key] = false
          }
          let va = this._validator[key];
          if (!va(value)) {
            return Reflect.set(target, key, value, proxy)
          } else {
            alert(`${errMsg[key]}格式不正确`);
            return target[key] = false
          }
        }
      })
    }
    const validators = {
      name(value) {
        return value.length > 30
      },
      passWd(value) {
        return value.length > 30
      },
    };
    const errorMsg = {
      name: '证件号码',
      passWd: '登录密码',
    };
    const vaLi = validator({}, validators, errorMsg);
    let validatorNext = function* () {
      yield vaLi.name = $(`input[name='username']`).val();
      yield vaLi.passWd = $(`input[name='password']`).val();
    };
    let _validator = validatorNext();
    _validator.next();
    !vaLi.name || _validator.next();
    !vaLi.passWd || _validator.next();
    LoginStore.postUserLogin({
      data: {
        action: 'UserLogin',
        cid: sessionStorage.getItem('cid'),
        company_type: sessionStorage.getItem('company_type'),
        username: vaLi.name,
        password: vaLi.passWd,
      }
    }, (res) => {

      console.log(res);
    });
  }
};
