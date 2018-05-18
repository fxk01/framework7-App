/**
 * 证劵产品逻辑
 */

'use strict';
import './fund.less';
import fundHtml from '../../page/fund.html'
import fundTpl from './fund.tpl.html';
import Tool from '../../utils/tool';
import widget from '../../utils/widget'
import FundStore from '../../store/fund_store';
import CountUp from '../../components/countUp';
import fundProducts from '../../components/fund-products/fund-products.html'
import fundInfoList from '../../components/fund-infoList/fund-infoList.html';
import userFdInformation from '../../components/user-fd-information/user-fd-information.html';
import fundAsset from '../../components/fund-asset/fund-asset.html';
import highCharts from 'highcharts';

export default class Fund extends widget {
  constructor() {
    super();
    this.show = false;
    this.showGood = false;
  }

  init(page) {
    let self = this;
    let fundPageDom = $('.fund-page');
    let _idCard = sessionStorage.getItem('idCard');
    let viewMainDom = $('.view-main').attr('data-page');
    if(viewMainDom !== 'fund') {
      $('.view-main').attr('data-page', 'fund');
      $('.pages').append(fundHtml);
      fundPageDom.remove();
      fundPageDom.addClass('page-on-center');
    }
    myApp.closeModal('.modal-main');
    let _fundTpl = Tool.renderTpl(fundTpl);
    fundPageDom.html('').append($(_fundTpl));
    if(fundPageDom.length === 0) {
      $('.fund-page').attr('class', 'page fund-page page-on-center');
      $('.fund-page').html('').append($(_fundTpl));
    }
    $('.userFundInformation').append(userFdInformation);
    $('.fundUser').text(sessionStorage.getItem('companyUser'));
    $('.fundIdCard').text(_idCard.substr(0,2) + '**************' + _idCard.substr(_idCard.length-2, 2));

    this.fundHomeData();
    this.fundListContent();
    $('.showHdAssets').on('click', (e) => { this.showAssets(e); });
    $('.showFundGoods').on('click', (e) => { this.showGoods(e); });
    $('.fundTab2Accordion').on('click', '.infoListGoods .accordion-item', function() { let itemSelf = $(this); self.openData(itemSelf); });
    $('.pullFundHome').on('refresh', () => { this.fundHomeData(); });
    $('.pullFund').on('refresh', () => {
      this.fundListContent().then(function(str) {
        if(str) {
          myApp.pullToRefreshDone();
        }
      });
    });
  }
  /*
   基金产品首页内容
   */
  fundHomeData() {
    Promise.all([this.postRiskTolerance(), this.postAssetsChart(), this.postAssetProfile()]).then(([ret1, ret2, ret3]) => {
      if(ret3 === 'c') {
        myApp.pullToRefreshDone();
      }
    });
  }
  /*
   获取风险承受能力
   */
  postRiskTolerance() {
    return new Promise((resolve) => {
      let assessmentResultDom = $('.assessmentResult');
      let gradeDom = $('.grade');
      let insertAnswerDateDom = $('.insertAnswerDate');
      let insertAnswerBetweenDaysDom = $('.insertAnswerBetweenDays');
      FundStore.postGetAnswer({
        data: {
          action: 'GetAnswer',
          cid: sessionStorage.getItem('cid'),
          accountId: sessionStorage.getItem('userId'),
          grade: sessionStorage.getItem('qScore'),
          topicType: sessionStorage.getItem('company_type'),
        }
      }, (res) => {
        if(sessionStorage.getItem('qScore') === '-1') {
          assessmentResultDom.text('未测评');
          gradeDom.text('未测评。');
          insertAnswerDateDom.text('-');
          insertAnswerBetweenDaysDom.text('-');
        } else {
          assessmentResultDom.text(res['assessment']);
          gradeDom.text(sessionStorage.getItem('qScore'));
          insertAnswerDateDom.text(sessionStorage.getItem('qTime').substring(0, 11).replace(/\//g, '.'));
          insertAnswerBetweenDaysDom.text(sessionStorage.getItem('betweenDays') + '天');
        }
        resolve('a');
      })
    })
  }
  /*
   获取用户产品
   */
  postAssetsChart() {
    return new Promise((resolve) => {
      FundStore.postRgUserChanPin({
        data: {
          action: 'GetRgUserChanPin',
          cid: sessionStorage.getItem('cid'),
          idCard: sessionStorage.getItem('idCard'),
        }
      }, (res) => {
        if(res['result'] === 'OK') {
          this.yhZiChan(res['chanpinList']).then((r1) => {
            resolve(r1);
          });
        } else {
          alert('接口错误！');
        }
      });
    });
  }
  /*
   获取资产概况&资产走势
   */
  yhZiChan(cp) {
    return new Promise((resolve) => {
      FundStore.postYonghuZichan({
        data: {
          action: 'yonghuZichan',
          cid: sessionStorage.getItem('cid'),
          idCard: sessionStorage.getItem('idCard'),
          ids: cp,
        }
      }, (res) => {
        let _arrXDate = [];
        let _arrData = [];
        let json = res.zichan;
        // json.capital = this.formatNumber(json['capital'], 2);
        // json.profit = this.formatNumber(json['profit'], 2);
        let echoTpl = Tool.renderTpl(fundAsset, json);
        $('.sdx-fund-sec').html('').append($(echoTpl));
        let options = {
          useEasing: true,
          useGrouping: true,
          separator: ',',
          decimal: '.',
        };
        new CountUp('myTargetElement', 0, json['capital'], 0, 2.5, options).start();
        new CountUp('myTargetElementSyE', 0, json['profit'], 0, 2.5, options).start();
        new CountUp('myTargetElementSyL', 0, json['returnRate'], 0, 2.5, options).start();
        for(let i = 0; i < res.zichan['zoushi'].length; i++) {
          _arrData.push(res.zichan['zoushi'][i].capital);
          _arrXDate.push(res.zichan['zoushi'][i].date.substring(0, 10).replace(/\//g, "."))
        }
        highCharts.chart('containerTrend', {
          chart: {
            type: 'areaspline'
          },
          title: {
            text: ' '
          },
          credits: {
            enabled: false
          },
          colors: ['#e97678'],
          legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 150,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: (highCharts.theme && highCharts.theme.legendBackgroundColor) || '#FFFFFF'
          },
          xAxis: {
            lineWidth: 0,
            tickWidth: 0,
            tickInterval: res.zichan['zoushi'].length - 1,
            categories: _arrXDate,
            plotBands: [{
              from: 4.5,
              to: 6.5,
            }]
          },
          yAxis: {
            title: {
              text: ' '
            }
          },
          tooltip: {
            shared: true,
            valueSuffix: ''
          },
          plotOptions: {
            areaspline: {
              fillOpacity: 0.5
            }
          },
          series: [{
            name: '资金',
            data: _arrData,
            turboThreshold: 0,
          }]
        });
        resolve('b');
      });
    })
  }
  /*
   获取已购产品
   */
  postAssetProfile() {
    return new Promise((resolve) => {
      FundStore.postYonghuChanpin({
        data: {
          action: 'yonghuChanpin',
          cid: sessionStorage.getItem('cid'),
          idCard: sessionStorage.getItem('idCard'),
          company_type: sessionStorage.getItem('company_type'),
        }
      }, (res) => {
        let echoFundProductsTpl = Tool.renderTpl(fundProducts, res);
        $('.tab1BlockItem').html('').append($(echoFundProductsTpl));
        resolve('c');
      })
    })
  }
  /*
   获取基金产品列表
   */
  fundListContent() {
    return new Promise((resolve) => {
      FundStore.postChanpinList({
        data: {
          action: 'ChanpinList',
          company_type: sessionStorage.getItem('company_type'),
          cid: sessionStorage.getItem('cid'),
          qScore: sessionStorage.getItem('qScore'),
          typeJudge: sessionStorage.getItem('userType') === '个人' ? 1 : 2,
          sfwzytzz: sessionStorage.getItem('sfwzytzz'),
          idCard: sessionStorage.getItem('idCard'),
        }
      }, (res) => {
        let json = res;
        for(let i = 0; i < json['chanpin_list'].length; i++) {
          json['chanpin_list'][i].found = ((json['chanpin_list'][i].total_unit_net_worth - 1) * 100).toFixed(1);
        }
        let echoFundInfoListTpl = Tool.renderTpl(fundInfoList, json);
        $('.fundTab2Accordion').html('').append($(echoFundInfoListTpl));
        resolve(true);
      });
    });
  }
  /*
   显示隐藏资产
   */
  showAssets(e) {
    if(this.show) {
      $('.showMoney').show();
      $('.hideMoney').hide();
      e.target.src = '../src/assets/images/home_openeye.png';
      this.show = false;
    } else {
      $('.showMoney').hide();
      $('.hideMoney').show();
      e.target.src = '../src/assets/images/home_closeeye.png';
      this.show = true;
    }
  }
  /*
   显示隐藏资产已购产品信息
   */
  showGoods(e) {
    if(this.showGood) {
      $('.showGoodField').show();
      $('.hideGoods').hide();
      e.target.src = '../src/assets/images/home_openeye.png';
      this.showGood = false;
    } else {
      $('.showGoodField').hide();
      $('.hideGoods').show();
      e.target.src = '../src/assets/images/home_closeeye.png';
      this.showGood = true;
    }
  }
  /*
   设置openData及跳转
   */
  openData(itemSelf) {
    sessionStorage.setItem('chanPinId', itemSelf.attr('data-chanpinid'));
    mainView.router.loadPage(`page/fundDetails.html?code=${itemSelf.attr('data-chanpincode')}`);
  }
};
