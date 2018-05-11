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
import userFdInformation from '../../components/user-fd-information/user-fd-information.html';
import fundAsset from '../../components/fund-asset/fund-asset.html';
import highCharts from 'highcharts';

export default class Fund extends widget {
  constructor() {
    super();
  }

  init() {
    let _idCard = sessionStorage.getItem('idCard');
    let viewMainDom = $('.view-main').attr('data-page');
    if(viewMainDom !== 'fund') {
      $('.view-main').attr('data-page', 'fund');
      $('.pages').append(fundHtml);
      $('.fund-page').addClass('page-on-center');
    }
    myApp.closeModal('.modal-main');
    let _fundTpl = Tool.renderTpl(fundTpl);
    $('.fund-page').show().append($(_fundTpl));
    $('.userFundInformation').append(userFdInformation);
    let pickerDevice = myApp.picker({
      input: '#picker-device',
      cols: [
        {
          textAlign: 'center',
          values: ['2016', '2017', '2018']
        }
      ],
      toolbarCloseText: '完成',
      onClose: function (p) {
        console.log(p);
      },
    });
    let pickerDeviceZxt = myApp.picker({
      input: '#pickerZxt',
      cols: [
        {
          textAlign: 'center',
          values: ['2016', '2017', '2018']
        }
      ],
      toolbarCloseText: '完成',
      onClose: function (p) {
        console.log(p);
      },
    });
    let calendarDefault = myApp.calendar({
      input: '#calendarDate',
    });
    $('.fundUser').text(sessionStorage.getItem('companyUser'));
    $('.fundIdCard').text(_idCard.substr(0,2) + '**************' + _idCard.substr(_idCard.length-2, 2));
    this.postAssetsChart();
    this.postNetValue();
    this.monthlyIncome();
    this.postAssetProfile();
    this.postRiskTolerance();
    let ptrContent = $('.pull-to-refresh-content');
    myApp.initPullToRefresh(ptrContent);
    ptrContent.on('refresh', function(e) {
      setTimeout(function () {
        console.log(1);
        myApp.pullToRefreshDone();
      }, 2000);
    });
  }
  /*
   获取资产概况
   */
  postAssetProfile() {
    FundStore.postYonghuChanpin({
      data: {
        action: 'yonghuChanpin',
        cid: sessionStorage.getItem('cid'),
        idCard: sessionStorage.getItem('idCard'),
        company_type: sessionStorage.getItem('company_type'),
      }
    }, (res) => {
      let json = res['chanpin'][0];
      json.capital = this.formatNumber(json['capital'], 2);
      json.profit = this.formatNumber(json['profit'], 2);
      json.return_rate = this.formatNumber(json['return_rate'], 2);
      let echoTpl = Tool.renderTpl(fundAsset, json);
      $('.sdx-fund-sec').html('').append($(echoTpl));
    })
  }
  /*
   获取风险承受能力
   */
  postRiskTolerance() {
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
    })
  }
  /*
   获取用户产品
   */
  postAssetsChart() {
    FundStore.postRgUserChanPin({
      data: {
        action: 'GetRgUserChanPin',
        cid: sessionStorage.getItem('cid'),
        idCard: sessionStorage.getItem('idCard'),
      }
    }, (res) => {
      if(res['result'] === 'OK') {
        this.yhZiChan(res['chanpinList']);
      } else {
        alert('接口错误！');
      }
    });
  }
  /*
   获取资产走势
   */
  yhZiChan(cp) {
    FundStore.postYonghuZichan({
      data: {
        action: 'yonghuZichan',
        cid: sessionStorage.getItem('cid'),
        idCard: sessionStorage.getItem('idCard'),
        ids: cp,
      }
    }, (res) => {
      let _arrXdate = [];
      let _arrData = [];
      for(let i = 0; i < res.zichan['zoushi'].length; i++) {
        _arrData.push(res.zichan['zoushi'][i].capital);
        _arrXdate.push(res.zichan['zoushi'][i].date.substring(0, 10).replace(/\//g, "."))
      }
      console.log(_arrData);
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
          minTickInterval: 1000,
          categories: _arrXdate,
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



    });
  }


  postNetValue() {
    highCharts.chart('containerJzZs', {
      chart: {
        type: 'area'
      },
      title: {
        text: ' '
      },
      subtitle: {
        text: ' '
      },
      xAxis: {
        allowDecimals: false,
        labels: {
          formatter: function () {
            return this.value;
          }
        }
      },
      yAxis: {
        title: {
          text: ' '
        },
        labels: {
          formatter: function () {
            return this.value / 1000 + 'k';
          }
        }
      },
      tooltip: {
        pointFormat: '{series.name} 制造 <b>{point.y:,.0f}</b>枚弹头'
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        area: {
          pointStart: 1940,
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            states: {
              hover: {
                enabled: true
              }
            }
          }
        }
      },
      series: [{
        name: ' ',
        data: [null, null, null, null, null, 6, 11, 32, 110, 235, 369, 640,
          1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
          27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
          26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
          24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
          22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
          10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104]
      }]
    });
  }
  monthlyIncome() {
    highCharts.chart('containerYdSy', {
      chart: {
        type: 'column'
      },
      title: {
        text: ' '
      },
      xAxis: {
        categories: ['苹果', '橘子', '梨', '葡萄', '香蕉']
      },
      yAxis: {
        title: {
          text: ' '
        },
      },
      credits: {
        enabled: false
      },
      series: [{
        name: '小张',
        data: [5, 3, 4, 7, 2]
      }, {
        name: '小彭',
        data: [2, -2, -3, 2, 1]
      }]
    });
  }
};
