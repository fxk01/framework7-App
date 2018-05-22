/**
 * 基本信息逻辑
 */

'use strict';
import './forgetPassword.less';
import forgetPasswordHtml from '../../page/forgetPassword.html';
import forgetPasswordTpl from './forgetPassword.tpl.html';
import Tool from '../../utils/tool';
import modiFyPs from '../../components/modify-ps/modify-ps.html';
import '../../components/modify-ps/modify-ps.less';
import widget from '../../utils/widget';
import $$ from 'jquery';
import '../../components/toast/toast.css';
import '../../components/toast/toast';
import Validator from 'validator.tool';
import forgetPwStore from '../../store/forgetPw_store';

export default class ForgetPassword extends widget {
  constructor() {
    super();
  }

  init() {
    let self = this;
    $('#root').append(forgetPasswordHtml);

    let _forgetPasswordTpl = Tool.renderTpl(forgetPasswordTpl);
    $('.forgetPassword-page').append($(_forgetPasswordTpl));
    $('.forget').append($(Tool.renderTpl(modiFyPs)));
    this.pickerZjLx();
    $$('.framework7-root').on('click', '.modifyRegLogin', () => { window.location.href = `/#!/page/login.html?cid=${Tool.parseURL('cid')}`; });
    $$('.forget').on('click', '.sdx-ps-ulTzzLx li', function() { let that = $(this); self.stInvestor(that); });
    $$('.forget').on('click', '.sdx-ps-yzm', function() { self.postYzm(); });
    $$('.forget').on('click', '.sdx-ps-bc', function() { self.validOne(); })
  }
  /*
   选择投资者类型
   */
  stInvestor(that) {
    that.css({
      'background-color': '#2745b3'
    });
    that.append('<div class="sdx-ps-gg"><img src="../../src/assets/images/gougou.png"></div>');
    $$('.sdx-ps-tzZlx').fadeOut();
    $$('.tZzOne').fadeIn();
  }
  /*
   选择证件类型
   */
  pickerZjLx() {
    myApp.picker({
      toolbarCloseText: '完成',
      input: '#pickerZjLx',
      cols: [
        {
          textAlign: 'center',
          values: [
            '身份证',
            '护照',
            '军官证',
            '士兵证',
            '港澳居民来往内地通行证',
            '户口本',
            '外国护照',
            '其他',
            '警官证',
            '台胞证',
            '外国人永久居住证',
          ]
        }
      ],
      onClose: function(p) {
        $('.oneType').val(p.value[0]);
      }
    });
  }
  /*
   验证
   */
  validOne() {
    let options = {
      duration: 2000,
    };
    let validator = new Validator('example_one', [
      {
        name: 'name',
        display: '真实姓名不能为空',
        rules: 'required'
      },
      {
        name: 'card_type',
        display: '证件类型不能为空',
        rules: 'required'
      },
      {
        name: 'id_card',
        display: '证件号码不能为空',
        rules: 'required'
      },
      {
        name: 'phone',
        display: '手机号码不能为空|手机号码格式不正确',
        rules: 'required|is_phone'
      },
      {
        name: 'pin',
        display: '验证码不能为空',
        rules: 'required'
      },
      {
        name: 'password',
        display: '新密码不能为空',
        rules: 'required'
      },
      {
        name: 'rePassWorld',
        display: '密码不一致',
        rules: 'same(password)|required'
      },
    ], function(obj) {
      try {
        console.log(obj)
        if(obj.errors.length > 0) {
          let toast = myApp.toast('', `<div>${obj.errors[0].message}</div>`, options);
          toast.show();
        } else {
          let liZe = $$('#example_one').serializeArray();
          let o = {};
          $$.each(liZe, function() {
            if (o[this.name] !== undefined) {
              if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
              }
              o[this.name].push(this.value || '');
            } else {
              o[this.name] = this.value || '';
            }
          });
          delete o['rePassWorld'];
          console.log(o);
          forgetPwStore.posUpdateUser({
            data: {
              action: 'UpdateUser',
              cid: sessionStorage.getItem('cid'),
              ...o,
            }
          }, (res) => {
            if(res.result === 'NG') {
              let toast = myApp.toast('', `<div>${res.error_message}</div>`, options);
              toast.show();
            } else {
              let toast = myApp.toast('', `<div>修改密码成功</div>`, options);
              toast.show();
            }
          });
        }
      } catch (e) {
        console.log(e.message);
      }
    });
    validator.validate()
  }
  /*
   获取手机验证码
   */
  postYzm() {
    let options = {
      duration: 2000,
    };
    let phoneVal = $('input[name="phone"]').val();
    if(phoneVal.length !== 11) {
      let toast = myApp.toast('', `<div>手机号码格式不正确</div>`, options);
      toast.show();
      return false;
    }
    forgetPwStore.postPin({
      data: {
        action: 'pin',
        phone: phoneVal,
      }
    }, (res) => {
      if(res.result === 'NG') {
        let toast = myApp.toast('', `<div>${res['error_message']}e</div>`, options);
        toast.show();
      } else {
        this.countDown();
      }
    })
  }
  /*
   倒计时
   */
  countDown() {
    let interValObj;
    let curCount = 30;

    function SetRemainTime() {
      if (curCount === 0) {
        $$('.sdx-ps-yzm').removeAttr('disabled');
        $$('.sdx-ps-yzm').text('获取验证码');
        window.clearInterval(interValObj);
      }
      else {
        curCount--;
        $$('.sdx-ps-yzm').text('获取验证码 ' + curCount);
      }
    }
    $$('.sdx-ps-yzm').attr('disabled', 'true');

    interValObj = window.setInterval(SetRemainTime, 1000);
  }
};
