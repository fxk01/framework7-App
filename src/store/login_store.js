/**
 * loginStore
 */

'use strict';
import request from '../utils/fetch'

export default {
  postAgreementMessage(params, callback) {
    params.path = 'data';
    request(params, 'POST', callback);
  }
};
