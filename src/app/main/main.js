/**
 * 首页逻辑
 */

'use strict';
import './main.less';
import mainTpl from './main.tpl.html';
import Tool from '../../utils/tool';
import sto from '../../store/main_store';
import highcharts from 'highcharts';

export default {
  init() {
    let _mainTpl = Tool.renderTpl(mainTpl, {
      score: '您的风险问卷调查得分为',
    });
    $('.main-page').append($(_mainTpl));
    this.ajaxMoney();
    this.assetsChart();
  },
  /*
   获取资产概况
   */
  ajaxMoney() {
    sto.contactInfo({
      data: {
        page: 1,
        pagesize: 10,
      }
    }, function(res){
      console.log(res);
    })
  },
  assetsChart() {
    highcharts.chart('container', {
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
        backgroundColor: (highcharts.theme && highcharts.theme.legendBackgroundColor) || '#FFFFFF'
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
};
