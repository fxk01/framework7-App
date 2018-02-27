/**
 * 测试例子
 * @type {Object|*}
 */

"use strict";
var page = require('webpage').create(),
  system = require('system'),
  t, address;
phantom.outputEncoding = "utf-8";

if (system.args.length === 1) {
  console.log('Usage: loadspeed.js <some URL>');
  phantom.exit();
} else {
  t = Date.now();
  address = system.args[1];

  /*
   从远程服务器请求的资源，请求和响应
   */
  page.onResourceRequested = function (req) {
    console.log('requested: ' + JSON.stringify(req, undefined, 4));
  };
  /*
  嗅探
  */
  page.onResourceReceived = function (res) {
    // console.log('received: ' + JSON.stringify(res, undefined, 4));
  };

  page.open(address, function(status) {
    if (status === "success") {
      t = Date.now() - t;
      var title = page.evaluate(function() { //evaluate“沙盒”
        return document.title;
      });
      console.log('页面标题' + title); //url文档的title标签
      console.log('加载url' + system.args[1]);
      console.log('加载时间' + t + ' msec'); //加载指定的URL（不要忘记http协议）并测量加载它的时间
      page.render('f7.png'); //页面加载保存页面图片
    } else {
      console.log('页面加载失败.'); //网络错误
    }
    phantom.exit();
  });
}
