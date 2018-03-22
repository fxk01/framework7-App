/**
 * login.js业务逻辑
 **/

'use strict';
import loginTpl from './login.tpl.html';
import Tool from '../utils/tool';
import '../components/toast/toast.css'
import '../components/toast/toast'
import './login.less'
import stoObj from '../components/stora-data'
import * as echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/toolbox';

export default {
  init(page) {
    let loginTPl = Tool.renderTpl(loginTpl);
    $('.login-page').append($(loginTPl));
    this.log();
  },
  log() {
    let main = document.getElementById('main');
    $('.loginHref').on('click', function() {
      let toast = myApp.toast('账号密码错误！');
      toast.show();
    });
    echarts.init(main).setOption({
      title: {text: 'Line Chart'},
      tooltip: {},
      toolbox: {
        feature: {
          dataView: {},
          saveAsImage: {
            pixelRatio: 2
          },
          restore: {}
        }
      },
      xAxis: {},
      yAxis: {},
      series: [{
        type: 'line',
        smooth: true,
        data: [[12, 5], [24, 20], [36, 36], [48, 10], [60, 10], [72, 20]]
      }]
    });
    stoObj.title = '我是标题！'
  }
}
