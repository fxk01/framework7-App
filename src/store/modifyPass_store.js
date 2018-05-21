/**
 * modifyPassStore
 */

'use strict';
import request from '../utils/fetch'

export default {
  postUpdatePassword(params, callback) {
    params.path = 'data';
    params.assign = {
      result: false,
    };
    request(params, 'POST', callback);
  }
};
