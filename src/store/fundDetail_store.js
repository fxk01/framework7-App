/**
 * fundDetailStore
 */

'use strict';
import request from '../utils/fetch'

export default {
  postChanPin(params, callback) {
    params.path = 'data';
    params.assign = {
      result: false,
      chanpin: {},
    };
    request(params, 'POST', callback);
  },
  postChanpinYaoSu(params, callback) {
    params.path = 'data';
    params.assign = {
      result: false,
      chanPinYaoSuList: [],
    };
    request(params, 'POST', callback);
  }
};
