/**
 * mainStore
 */

'use strict';
import request from '../utils/fetch'

export default {
  companyListQuery(params, callback) {
    params.path = 'data';
    params.assign = {
      result: false,
      queryCompanylist: [],
    };
    request(params, 'POST', callback);
  }
};
