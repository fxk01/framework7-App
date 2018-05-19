/**
 * recordStore
 */

'use strict';
import request from '../utils/fetch'

export default {
  postYonghuJiaoyi(params, callback) {
    params.path = 'data';
    params.assign = {
      result: false,
      jiaoyi: [],
      updateDate: '',
    };
    request(params, 'POST', callback);
  },
};
