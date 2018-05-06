/**
 * mainStore
 */

'use strict';
import request from '../utils/fetch'

export default {
  companyListQuery(params, callback) {
    params.path = 'data';
    request(params, 'POST', callback);
  }
};
