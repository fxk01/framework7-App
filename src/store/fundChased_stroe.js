/**
 * fundChasedStore
 */

'use strict';
import request from '../utils/fetch'

export default {
  postYonghuChanpin(params, callback) {
    params.path = 'data';
    params.assign = {
      result: false,
      chanpin: [],
      updateDate: '',
    };
    request(params, 'POST', callback);
  },
};
