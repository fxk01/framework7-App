/**
 * loginStore
 */

'use strict';
import request from '../utils/fetch'

export default {
  postAgreementMessage(params, callback) {
    params.path = 'data';
    params.assign = {
      result: false,
      AgreementMessageList: [],
    };
    request(params, 'POST', callback);
  }
};
