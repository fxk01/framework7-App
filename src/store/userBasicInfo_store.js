/**
 * userBasicInfoStore
 */

'use strict';
import request from '../utils/fetch'

export default {
  postUserZcJbxx(params, callback) {
    params.path = 'data';
    params.assign = {
      result: false,
      yongHuJbxx: {},
    };
    request(params, 'POST', callback);
  },
  postBcUserZcJbxx(params, callback) {
    params.path = 'data';
    params.assign = {
      result: false,
      result_B: false,
      yongHuJbxx: {}
    };
    request(params, 'POST', callback);
  },
};
