/**
 * ajax请求
 */

'use strict';
import Constant from './constant';

export default function(params, type = 'POST', callback) {
  let defaults = {
    url: Constant.SERVER_URL + params.path,
    type: type,
    dataType: 'json',
    callback,
    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
  };
  $.each(defaults, function(key, val){
    if (!params[key]) {
      params[key] = val;
    }
  });
  let _successFn = params.success;
  params.success = function(result, status, xhr) {
    if(status === 200 && result['result'] === 'OK') {
      console.log(result);
      callback(result);
    } else {
      // 请求失败拦截
    }
    _successFn(result, status, xhr);
  };
  if (params.type.toUpperCase() === 'POST' && params.contentType && params.contentType.indexOf('json') !== -1) {
    params.data = JSON.stringify(params.data);
  }
  $.ajax(params);
}
