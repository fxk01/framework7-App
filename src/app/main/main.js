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
    let topicsTpl = Tool.renderTpl(companyList, {});
    $('.modal').append($(topicsTpl));
    $('.modal-text-input').attr('placeholder', '请输入公司名称');
    $('.modal-text-input').on('input porpertychange', (e) => { this.queryCompany(e); });
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
        $('.companyList ul').html('').append($(topicsTpl));
        console.log(res);
      })
    }
  }
};
