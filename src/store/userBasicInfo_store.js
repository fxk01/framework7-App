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
};
