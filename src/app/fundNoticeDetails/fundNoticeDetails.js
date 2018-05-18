/**
 * 基金产品公告详情
 */

'use strict';
import './fundNoticeDetails.less';
import fundNoticeDetailsHtml from '../../page/fundNoticeDetails.html';
import fundNoticeDetailsTpl from './fundNoticeDetails.tpl.html';
import fundBulletinDetailsTpl from '../../components/fund-bulletinDetails/fund-bulletinDetails.html';
import Tool from '../../utils/tool';
import widget from '../../utils/widget';
import fundNoticeDetailsStore from '../../store/fundGgDetails_store';

export default class FundNoticeDetails extends widget {
  init() {
    let viewMainDom = $('.view-main').attr('data-page');
    if(viewMainDom !== 'fundNoticeDetails') {
      $('.view-main').attr('data-page', 'fundNoticeDetails');
      $('.pages').append(fundNoticeDetailsHtml);
      $('.fundNoticeDetails-page').addClass('page-on-center')
    }
    let _fundNoticeDetailsTpl = Tool.renderTpl(fundNoticeDetailsTpl, {
      code: Tool.parseURL('code'),
    });
    $('.fundNoticeDetails-page').append($(_fundNoticeDetailsTpl));

    this.postGgDetails();
  }
  /*
   获取产品公告详情
   */
  postGgDetails() {
    fundNoticeDetailsStore.postChanPinGongGao({
      data: {
        action: 'ChanPinGongGao',
        ChanPinCode: Tool.parseURL('code'),
        cid: sessionStorage.getItem('cid'),
        id: Tool.parseURL('id'),
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
      let _fundBulletinDetailsTpl = Tool.renderTpl(fundBulletinDetailsTpl, res);
      $('.productBulletinDetails').html('').append($(_fundBulletinDetailsTpl));
    })
  }
};
