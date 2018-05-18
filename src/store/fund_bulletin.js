/**
 * fundBulletinStore
 */

'use strict';
import request from '../utils/fetch'

export default {
  postChanPinGongGao(params, callback) {
    params.path = 'data';
    params.assign = {
      result: false,
      ChanPinGongGao: [],
    };
    request(params, 'POST', callback);
  },
};
