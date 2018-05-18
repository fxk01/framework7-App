/**
 * reservationStore
 */

'use strict';
import request from '../utils/fetch'

export default {
  postYuYueChanPin(params, callback) {
    params.path = 'data';
    params.assign = {
      result: false,
    };
    request(params, 'POST', callback);
  }
};
