/**
 * 基金产品公告列表
 */

'use strict';
import './fundBulletin.less';
import fundBulletinHtml from '../../page/fundBulletin.html';
import fundBulletinTpl from './fundBulletin.tpl.html';
import Tool from '../../utils/tool';
import widget from '../../utils/widget';
import ggListTpl from '../../components/fund-ggList/fund-ggList.html';
import fundBulletinStore from '../../store/fund_bulletin';

export default class FundBulletin extends widget {
  init() {
    let viewMainDom = $('.view-main').attr('data-page');
    if(viewMainDom !== 'fundBulletin') {
      $('.view-main').attr('data-page', 'fundBulletin');
      $('.pages').append(fundBulletinHtml);
      $('.fundBulletin-page').addClass('page-on-center')
    }
    let _fundBulletinTpl = Tool.renderTpl(fundBulletinTpl, {
      code: Tool.parseURL('code'),
    });
    $('.fundBulletin-page').append($(_fundBulletinTpl));
    this.noticeList();
  }
  /*
   获取公告列表
   */
  noticeList() {
    if(sessionStorage.getItem('rgFlag') === 'undefined') {
      $('.rgFlagListTrue').hide();
      $('.rgFlagListFalse').show();
      return false;
    } else if(sessionStorage.getItem('rgFlag') === '1') {
      $('.rgFlagListTrue').show();
      $('.rgFlagListFalse').hide();
      fundBulletinStore.postChanPinGongGao({
        data: {
          action: 'ChanPinGongGao',
          cid: sessionStorage.getItem('cid'),
          ChanPinCode: Tool.parseURL('code'),
          readPower: this.getReadPower(),
        }
      }, (res) => {
        let _json = res;
        for(let i = 0; i < _json.ChanPinGongGao.length; i++) {
          let oldTime = (new Date(_json.ChanPinGongGao[i]['create_timestamp'])).getTime();
          let da = new Date(oldTime);
          let year = da.getFullYear() + '年';
          let month = da.getMonth() + 1 + '月';
          let date = da.getDate() + '日';
          _json.ChanPinGongGao[i]['create_timestamp'] = [year, month, date].join('');
        }
        let _ggListTpl = Tool.renderTpl(ggListTpl, res);
        $('.rgFlagListTrue').html('').append($(_ggListTpl));
      })
    }
  }
};
