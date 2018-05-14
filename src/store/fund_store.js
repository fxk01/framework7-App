/**
 * fundStore
 */

'use strict';
import request from '../utils/fetch'

export default {
  postYonghuChanpin(params, callback) {
    params.path = 'data';
    params.assign = {
      result: false,
      chanpin: [],
    };
    request(params, 'POST', callback);
  },
  postGetAnswer(params, callback) {
    params.path = 'data';
    params.assign = {
      result: false,
      assessment: '-'
    };
    request(params, 'POST', callback);
  },
  postYonghuZichan(params, callback) {
    params.path = 'data';
    params.assign = {
      result: false,
      lishijingzhiAll: [],
      zichan: {},
    };
    request(params, 'POST', callback);
  },
  postRgUserChanPin(params, callback) {
    params.path = 'data';
    params.assign = {
      result: false,
      chanpinList: ''
    };
    request(params, 'POST', callback);
  },
  postChanpinList(params, callback) {
    params.path = 'data';
    params.assign = {
      result: false,
      chanpin_list: [],
    };
    request(params, 'POST', callback);
  }
};
