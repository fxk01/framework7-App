/**
 * 首页逻辑
 */

'use strict';
import './main.less';
import Xhr from '../utils/xhr';
import mainHtml from './main.tpl.html';
import Tool from '../utils/tool';
import Constant from '../utils/constant';

export default {
  init(){
    let that = this;
    this.getTopics(1, function(res){
      res.data = that.transformData(res.data);
      let topicsTpl = Tool.renderTpl(mainHtml, res);
      $('.media-list ul').html('').append($(topicsTpl));
      if($('.media-list').height() + $('.pull-to-refresh-layer').height() < window.screen.height) {
        that.getTopics(2, function(res){
          res.data = that.transformData(res.data);
          let topicsTpl = Tool.renderTpl(mainHtml, res);
          $('.media-list ul').append($(topicsTpl));
        });
      }
    });
    // this.setAvatar(Constant.AVATAR);
    this.pushRefresh();
    this.loadMore();
  },
  getTopics(page, callback){
    let params = {
      page: page,
      tab: 'all',
      success: success,
      error: error
    }, that = this;
    function success(res){
      console.log(res);
      callback && callback(res);
    }
    function error(err){
      console.log(err);
    }
    Xhr.getTopics(params)
  },
  setAvatar(pic){
      let _avatarElm = $('.panel-avatar img');
      _avatarElm.attr('src', pic);
  },
  /*
   上拉刷新
   */
  pushRefresh(){
    let ptrContent = $('.pull-to-refresh-content'),
        that = this;
    ptrContent.on('refresh', function (e) {
      that.getTopics(1, function(res){
        res.data = that.transformData(res.data);
        let topicsTpl = Tool.renderTpl(mainHtml, res);
        $('.media-list ul').html('').append($(topicsTpl));
        myApp.pullToRefreshDone();

        if($('.media-list').height() + $('.pull-to-refresh-layer').height() < window.screen.height) {
          that.getTopics(2, function(res){
            res.data = that.transformData(res.data);
            let topicsTpl = Tool.renderTpl(mainHtml, res);
            $('.media-list ul').append($(topicsTpl));
          });
        }
      });
    });
  },
  /*
   无限滚动
   */
  loadMore(){
    let loading = false,
        that = this,
        page = 2;
    $('.infinite-scroll').on('infinite', function () {
      if (loading) return;
      loading = true;
      that.getTopics(page, function(res){
        if (res.length !== 0) {
          ++page;
          res.data = that.transformData(res.data);
          let topicsTpl = Tool.renderTpl(mainHtml, res);
          $('.media-list ul').append($(topicsTpl));
          loading = false;
        } else {
          myApp.detachInfiniteScroll($('.infinite-scroll'));
          $('.infinite-scroll-preloader').remove();
        }
      });
    });
  },
  transformData(data){
    for(let i = 0, l = data.length; i < l; i++) {
      if(data[i].top) {
        data[i].type = window.polyglot.t("tag.top");
        continue;
      }
      switch (data[i].tab) {
        case 'share':
          data[i].type = window.polyglot.t("tag.share");
          break;
        case 'ask':
          data[i].type = window.polyglot.t("tag.ask");
          break;
        case 'job':
          data[i].type = window.polyglot.t("tag.job");
          break;
        case 'good':
          data[i].type = window.polyglot.t("tag.good");
          break;
        default:
          data[i].type = window.polyglot.t("tag.normal");
          break;
      }
    }
    return data;
  }
};
