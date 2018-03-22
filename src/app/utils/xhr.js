/**
 * 封装ajax
 */

'use strict';
import Constant from './constant';

export default {
  getTopics(params) {
    params.path = '/api/v1/topics/?page=' + params.page + '&tab=' + params.tab + '&limit=10';
    request(params, 'GET');
  },
  getDetailById(params) {
    params.path = '/api/v1/topic/' + params.id;
    request(params, 'GET');
  }
};

function request(params, type) {
  let defaults = {
    url: Constant.SERVER_URL + params.path,
    type: type,
    contentType: 'application/json',
    dataType: 'json',
    complete: function(request, status) {}
  };
  $.each(defaults, function(key, val){
    if (!params[key]) {
      params[key] = val;
    }
  });

  let _successFn = params.success;
  params.success = function(result, status, xhr) {
    // console.log(result);
    if (false) {
      //拦截
    }
    _successFn(result, status, xhr);
  };
  if (params.type.toUpperCase() === 'POST' && params.contentType && params.contentType.indexOf('json') !== -1) {
    params.data = JSON.stringify(params.data);
  }
  // console.log('调用接口:\n%s,\n参数列表:', params.url, params.data);
  $.ajax(params);
}
