/**
 * 证劵产品逻辑
 */

'use strict';
import './fund.less';
import fundHtml from '../../page/fund.html'
import fundTpl from './fund.tpl.html';
import Tool from '../../utils/tool';
import widget from '../../utils/widget'
import highCharts from 'highcharts';

export default class Fund extends widget {
  constructor() {
    super();
  }

  init() {
    let viewMainDom = $('.view-main').attr('data-page');
    if(viewMainDom !== 'fund') {
      $('.view-main').attr('data-page', 'fund');
      $('.pages').append(fundHtml);
      $('.fund-page').addClass('page-on-center')
    }
    myApp.closeModal('.modal-main');
    let _fundTpl = Tool.renderTpl(fundTpl, {
      score: '您的风险问卷调查得分为',
    });
    $('.fund-page').show().append($(_fundTpl));
    this.assetsChart();
    this.postNetValue();
    this.monthlyIncome();

    let ptrContent = $('.pull-to-refresh-content');
    myApp.initPullToRefresh(ptrContent);
    ptrContent.on('refresh', function(e) {
      setTimeout(function () {
        console.log(1);
        myApp.pullToRefreshDone();
      }, 2000);
    });

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
  }
  assetsChart() {
    highCharts.chart('container', {
      chart: {
        type: 'areaspline'
      },
      title: {
        text: ''
      },
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
        categories: [
          '周一',
          '周二',
          '周三',
          '周四',
          '周五',
          '周六',
          '周日'
        ],
        plotBands: [{
          from: 4.5,
          to: 6.5,
        }]
      },
      yAxis: {
        title: {
          text: ''
        }
      },
      tooltip: {
        shared: true,
        valueSuffix: ' 单位'
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        areaspline: {
          fillOpacity: 0.5
        }
      },
      series: [{
        name: '小张',
        data: [3, 4, 3, 5, 4, 10, 12]
      }]
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
