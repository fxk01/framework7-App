/**
 * 交易记录逻辑
 */

'use strict';
import './purchasedProducts.less';
import purchasedProductsHtml from '../../page/purchasedProducts.html';
import purchasedProductsTpl from './purchasedProducts.tpl.html';
import Tool from '../../utils/tool';
import fundProducts from '../../components/fund-products/fund-products.html';
import chasedStore from '../../store/fundChased_stroe'
import widget from '../../utils/widget';

export default class PurchasedProducts extends widget {
  constructor() {
    super();
  }

  init() {
    $('#root').append(purchasedProductsHtml);
    let _purchasedProductsTpl = Tool.renderTpl(purchasedProductsTpl);
    $('.purchasedProducts-page').append($(_purchasedProductsTpl));

    $('.purHrefFund').on('click', () => { window.location.href = '/#!/page/fund.html'; });
    this.chased();
  }
  /*
   获取已购产品
   */
  chased() {
    chasedStore.postYonghuChanpin({
      data: {
        action: 'yonghuChanpin',
        cid: sessionStorage.getItem('cid'),
        idCard: sessionStorage.getItem('idCard'),
        company_type: sessionStorage.getItem('company_type'),
      }
    }, (res) => {
      let echoFundProductsTpl = Tool.renderTpl(fundProducts, res);
      $('.chased').html('').append($(echoFundProductsTpl));
    })
  }
};
