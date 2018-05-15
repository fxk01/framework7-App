/**
 * 登录业务逻辑
 */

'use strict';
import './fundDetails.less';
import fundDetailHtml from '../../page/fundDetails.html';
import fundDetailTpl from './fundDetails.tpl.html';
import Tool from '../../utils/tool';
import widget from '../../utils/widget';
import fundGdInFo from '../../components/fundGood-info/fundGood-info.html';
import ydsyTpl from '../../components/ydsyTpl/ydsyTpl.html';
import fundPerForManCe from '../../components/fund-performance/fund-performance.html';
import fundDetailStore from '../../store/fundDetail_store';
import highCharts from 'highcharts';

export default class fundDetail extends widget {
  constructor() {
    super();
  }

  init(page) {
    let fundDetailPageDom = $('.fundDetail-page');
    let viewMainDom = $('.view-main').attr('data-page');
    if(viewMainDom !== 'fundDetails') {
      $('.view-main').attr('data-page', 'fundDetails');
      $('.pages').append(fundDetailHtml);
      fundDetailPageDom.remove();
      fundDetailPageDom.addClass('page-on-center');
    }
    let _fundDetailTpl = Tool.renderTpl(fundDetailTpl);
    $('.fundDetails-page').html('').append($(_fundDetailTpl));
    if(fundDetailPageDom.length === 0) {
      fundDetailPageDom.attr('class', 'page fund-page page-on-center');
      fundDetailPageDom.html('').append($(_fundDetailTpl));
    }
    let calendarDefault = myApp.calendar({
      input: '#calendarDate',
    });
    this.fundGoodInfo();
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
      let json = res['chanpin'];
      let dateArr = [];
      json['total_unit_net_worth'] = json.total_unit_net_worth.toFixed(4);
      json['create_date'] = json['create_date'].substring(0, 11).replace(/\//g, ".");
      json['unit_net_worth_date'] = json['unit_net_worth_date'].replace(/\//g, ".");
      json['year_return_rate'] = (json['year_return_rate']).toFixed(1);
      json['found'] = ((json['total_unit_net_worth'] - 1) * 100).toFixed(1);
      let echoFundGdInFoTpl = Tool.renderTpl(fundGdInFo, json);
      $('.sdxEchoCpInfo').html('').append($(echoFundGdInFoTpl));
      for(let j = 0; j < json['yueshouyi'].length; j++) {
        let getTime = new Date(json['yueshouyi'][j].date).getTime();
        json['yueshouyi'][j].format = new Date(getTime).getFullYear() + '年' +  new Date(getTime).getMonth() + '月';
        json['yueshouyi'][j].year = new Date(getTime).getFullYear();
        dateArr.push(new Date(getTime).getFullYear());
      }
      let formatArr = this.removeArrValue(dateArr);
      $('.fundPerForManCe').html('').append($(Tool.renderTpl(fundPerForManCe, json)));
      this.postNetValue(json['lishijingzhi']);
      this.monthlyIncome(json['yueshouyi'], formatArr, json);
    })
  }
  /*
   获取净值走势
   */
  postNetValue(jz) {
    let jzJson = jz;
    let companyJzArr = [];
    let addUpArr = [];
    let dateSFM = '';
    let _categories = [];
    for(let i = 0; i < jzJson.length; i++) {
      companyJzArr.push(jzJson[i]['unit_net_worth']);
      addUpArr.push(jzJson[i]['total_unit_net_worth']);
      dateSFM = /\d{4}[/]\d{1,2}[/]\d{1,2}/g.exec(jz[i].date);
      _categories.push(dateSFM[0]);
    }
    highCharts.chart('containerJzZs', {
      chart: {
        type: 'spline'
      },
      title: {
        text: ' '
      },
      subtitle: {
        text: ' '
      },
      xAxis: {
        tickWidth: 0,
        type: 'datetime',
        labels: {
          overflow: 'justify'
        },
        categories: _categories,
        tickInterval: _categories.length - 1,
      },
      colors: ['#438eff', '#ff7246'],
      yAxis: {
        title: {
          text: ' '
        },
        min: 0,
        minorGridLineWidth: 0,
        gridLineWidth: 0,
        alternateGridColor: null,
      },
      tooltip: {
        valueSuffix: ' ',
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        spline: {
          lineWidth: 4,
          states: {
            hover: {
              lineWidth: 5
            }
          },
          marker: {
            enabled: false
          },
        }
      },
      series: [{
        name: '单位净值',
        data: companyJzArr,
      }, {
        name: '累计净值',
        data: addUpArr,
      }],
      navigation: {
        menuItemStyle: {
          fontSize: '10px'
        }
      }
    });
  }
  /*
   获取月度收益
   */
  monthlyIncome(sy, formatArr, jsonRes) {
    let self = this;
    let _jsonRes = jsonRes;
    let syJson = sy;
    let _newData = [];

    this.DrawMonthlyIncome(sy);

    myApp.picker({
      input: '#pickerZxt',
      cols: [
        {
          textAlign: 'center',
          values: ['全部', ...formatArr]
        }
      ],
      toolbarCloseText: '完成',
      closeByOutsideClick: false,
      onClose: function (p) {
        if(p.value[0] !== '全部') {
          _newData.splice(0, _newData.length);
          syJson.filter((val) => {
            if(val.year === parseInt(p.value[0])) {
              _newData.push(val);
            }
          });
        } else {
          _newData = [...syJson];
        }
        console.log(_newData);
        $('.monSyText').text(p.value[0]);
        _jsonRes['yueshouyi'] = _newData;
        self.againDrawMonthlyIncome(_newData, _jsonRes);
      },
    });
  }
  /*
   绘制月度收益
   */
  DrawMonthlyIncome(sy) {
    let syJson = sy;
    let profitSyArr = [];
    let date = [];
    for(let i = 0; i < syJson.length; i++) {
      profitSyArr.push(syJson[i]['return_ratio']);
      date.push(syJson[i]['date'].substring(0, 7).replace(/\//g, "."));
    }

    highCharts.chart('containerYdSy', {
      chart: {
        type: 'column'
      },
      title: {
        text: ' '
      },
      colors: ['#df3d3e', '#c9c9c9'],
      xAxis: {
        lineWidth: 0,
        tickWidth: 0,
        categories: date,
        tickInterval: date.length - 1,
      },
      yAxis: {
        title: {
          text: ' '
        },
        labels: {
          formatter: function () {
            return this.value + '%';
          }
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        name: '盈利',
        data: profitSyArr,
        tooltip: {
          valueSuffix: '%'
        }
      }]
    });
  }
  /*
   重新绘制月度收益
   */
  againDrawMonthlyIncome(newData, jsonRes) {
    $('.ydList').html('').append($(Tool.renderTpl(ydsyTpl, jsonRes)));

    let syJson = newData;
    let profitSyArr = [];
    let date = [];
    for(let i = 0; i < syJson.length; i++) {
      profitSyArr.push(syJson[i]['return_ratio']);
      date.push(syJson[i]['date'].substring(0, 7).replace(/\//g, "."));
    }

    highCharts.chart('containerYdSy', {
      chart: {
        type: 'column'
      },
      title: {
        text: ' '
      },
      colors: ['#df3d3e', '#c9c9c9'],
      xAxis: {
        lineWidth: 0,
        tickWidth: 0,
        categories: date,
        tickInterval: date.length - 1,
      },
      yAxis: {
        title: {
          text: ' '
        },
        labels: {
          formatter: function () {
            return this.value + '%';
          }
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        name: '盈利',
        data: profitSyArr,
        tooltip: {
          valueSuffix: '%'
        }
      }]
    });
  }
};
