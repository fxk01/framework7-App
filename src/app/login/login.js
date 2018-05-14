/**
 * 登录业务逻辑
 */

'use strict';
import './login.less';
import '../../components/toast/toast.css';
import '../../components/toast/toast';
import loginHtml from '../../page/login.html';
import loginTpl from './login.tpl.html';
import Tool from '../../utils/tool';
import widget from '../../utils/widget';
import LoginStore from '../../store/login_store';

export default class Complaint extends widget {
  static defaultHtml = {
    tem: `<div style="text-align: left;">尊敬的投资者</div>`,
  };

  constructor() {
    super();
  }

  init(page) {
    let viewMainDom = $('.view-main').attr('data-page');
    if(viewMainDom !== 'login') {
      $('.view-main').attr('data-page', 'login');
      $('.pages').append(loginHtml);
      $('.login-page').remove();
      $('.login-page').addClass('page-on-center');
    }
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
    this.screen = $('.login-screen');
    this.screen.on('click', '.sdx-link-login', () => { this.loginHome(); });
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
    let btnActivation = $('#btnActivation');
    function validator(target, validator, errorMsg) {
      let options = {
        onHide: function () {
          console.log('hidden');
        },
        duration: 2000
      };
      return new Proxy(target, {
        _validator: validator,
        set(target, key, value, proxy) {
          let errMsg = errorMsg;
          if (value === '') {
            let toast = myApp.toast('', `<div>${errMsg[key]}不能为空！</div>`, options);
            toast.show();
            throw new TypeError(`${errMsg[key]}不能为空！`);
          }
          let va = this._validator[key];
          if (!va(value)) {
            return Reflect.set(target, key, value, proxy)
          } else {
            let toast = myApp.toast('', `<div>${errMsg[key]}格式不正确</div>`, options);
            toast.show();
            throw new TypeError(`${errMsg[key]}格式不正确`);
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
    if(!btnActivation.hasClass(('btn--activated'))){
      btnActivation.removeClass('btn--activate');
      btnActivation.addClass('btn--waiting');
    }
    setTimeout(() => {
      LoginStore.postUserLogin({
        data: {
          action: 'UserLogin',
          cid: sessionStorage.getItem('cid'),
          company_type: sessionStorage.getItem('company_type'),
          username: vaLi.name,
          password: vaLi.passWd,
        }
      }, (res) => {
        if(res['result'] === 'NumNG') {
          myApp.alert('账号或密码错误！', '提示');
        } else if(res.result === 'InterNG') {
          myApp.alert('网络故障。', '提示');
        }else if(res.result === 'RoleNG') {
          myApp.alert('该用户目前暂无任何角色，无法登录。', '提示');
        } else {
          for(let key in res) {
            if(key !== 'result') {
              sessionStorage.setItem(key, res[key]);
            }
          }
          if(sessionStorage.getItem('company_type') === '1') {
            mainView.router.loadPage(`page/fund.html`);
          }
        }
        btnActivation.removeClass('btn--waiting');
        btnActivation.addClass('btn--activate');
      });
    }, 1500);
  }
};
