/**
 * 登录业务逻辑
 */

'use strict';
import './fundDetails.less';
import fundDetailHtml from '../../page/fundDetails.html';
import fundDetailTpl from './fundDetails.tpl.html';
import Tool from '../../utils/tool';
import widget from '../../utils/widget';
import fundGdInFo from '../../components/fundGood-info/fundGood-info.html'
import fundDetailStore from '../../store/fundDetail_store';
import highCharts from 'highcharts';

export default class fundDetail extends widget {
  constructor() {
    super();
  }

  init(page) {
    let viewMainDom = $('.view-main').attr('data-page');
    if(viewMainDom !== 'fundDetails') {
      $('.view-main').attr('data-page', 'fundDetails');
      $('.pages').append(fundDetailHtml);
      $('.fundDetail-page').remove();
      $('.fundDetail-page').addClass('page-on-center');
    }
    let _fundDetailTpl = Tool.renderTpl(fundDetailTpl);
    $('.fundDetails-page').append($(_fundDetailTpl));
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
    this.fundGoodInfo();
    // this.postNetValue();
    // this.monthlyIncome();
  }
  /*
   获取基金产品信息
   */
  fundGoodInfo() {
    fundDetailStore.postChanPin({
      data: {
        action: 'chanpin',
        ChanPinCode: Tool.parseURL('code'),
        cid: sessionStorage.getItem('cid'),
      }
    }, (res) => {
      console.log(res)
      let json = res['chanpin'];
      json['total_unit_net_worth'] = json.total_unit_net_worth.toFixed(4);
      json['create_date'] = json['create_date'].substring(0, 11).replace(/\//g, ".");
      json['unit_net_worth_date'] = json['unit_net_worth_date'].replace(/\//g, ".");
      json['year_return_rate'] = (json['year_return_rate']).toFixed(1);
      json['found'] = ((json['total_unit_net_worth'] - 1) * 100).toFixed(1);
      let echoFundGdInFoTpl = Tool.renderTpl(fundGdInFo, json);
      $('.sdx-fund-userInformation').html('').append($(echoFundGdInFoTpl));

    })
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
