/**
 * 首页逻辑
 */

'use strict';
import './main.less';
import mainTpl from './main.tpl.html';
import companyList from '../../components/company-list/company-list.html'
import Tool from '../../utils/tool';
import widget from '../../utils/widget'
import MainStore from '../../store/main_store'

export default class Main extends widget {
  constructor() {
    super();
  }

  init() {
    let _mainTpl = Tool.renderTpl(mainTpl);
    $('.main-page').append($(_mainTpl));
    myApp.prompt('', '');
    $('.modal').addClass('modal-main');
    $('.modal-text-input').attr('placeholder', '请输入公司名称');
    $('.modal-text-input').on('input porpertychange', (e) => { this.queryCompany(e); });
    $('.modal-main').on('click', '.sdx-main-ul li', (e) => { this.jumpLogin(e); });
  }
  /*
   查询公司名称
   */
  queryCompany(e) {
    if(e.target.value.length > 0) {
      MainStore.companyListQuery({
        data: {
          action: 'CompanyListQuery',
          companyName: e.target.value,
        }
      }, (res) => {
        let topicsTpl = Tool.renderTpl(companyList, res);
        $('.modal-main .companyList').remove();
        $('.modal-main').append($(topicsTpl));
      })
    }
  }
  /*
   登陆
   */
  jumpLogin(e) {
    let _dataId = e.target.getAttribute('data-id');
    let _companyType = e.target.getAttribute('data-type');
    sessionStorage.setItem('cid', _dataId);
    sessionStorage.setItem('company_type', _companyType);
    let data = '=' + _dataId;
    let code = [];
    for(let i = 0; i < data.length; i++) {
      code += 'D' + data.charCodeAt(i).toString(6);
    }
    data = code + 'T' + _companyType;
    mainView.router.loadPage(`page/login.html?cid=${data}`);
  }
};
