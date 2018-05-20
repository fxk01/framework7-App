/**
 * 交易记录逻辑
 */

'use strict';
import './record.less';
import recordHtml from '../../page/record.html';
import recordTpl from './record.tpl.html';
import Tool from '../../utils/tool';
import widget from '../../utils/widget';
import recordStore from '../../store/record_store';
import recordListTpl from '../../components/fund-record/fund-record.html';

export default class Record extends widget {
  constructor() {
    super();
  }

  init() {
    let viewMainDom = $('.view-main').attr('data-page');
    if(viewMainDom !== 'record') {
      $('.view-main').attr('data-page', 'record');
      $('.pages').append(recordHtml);
      $('.record-page').addClass('page-on-center')
    }
    let _recordTpl = Tool.renderTpl(recordTpl);
    $('.record-page').append($(_recordTpl));

    this.transactionRecord();
  }
  /*
   获取交易记录
   */
  transactionRecord() {
    recordStore.postYonghuJiaoyi({
      data: {
        action: 'yonghuJiaoyi',
        cid: sessionStorage.getItem('cid'),
        idCard: sessionStorage.getItem('idCard'),
      }
    }, (res) => {
      let json = res;
      for(let i = 0; i < json['jiaoyi'].length; i++) {
        json['jiaoyi'][i].detail[i].date = json['jiaoyi'][i].detail[i].date.substring(0, 10).replace(/\//g , ".");
        json['jiaoyi'][i].detail[i]['unit_net_worth'] = json['jiaoyi'][i].detail[i]['unit_net_worth'].toFixed(4);
        json['jiaoyi'][i].detail[i]['amount'] = this.formatNumber(json['jiaoyi'][i].detail[i]['amount'], 2);
        json['jiaoyi'][i].detail[i]['shares'] = this.formatNumber(json['jiaoyi'][i].detail[i]['shares'], 2);
      }
      let _recordListTpl = Tool.renderTpl(recordListTpl, json);
      $('.recordList').html('').append($(_recordListTpl));
    })
  }
};
