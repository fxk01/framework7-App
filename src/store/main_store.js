/**
 * mainStore
 */

'use strict';
import request from '../utils/fetch'

export default {
  contactInfo(params, callback) {
    params.path = 'read/contactinfo';
    request(params, 'get', callback);
  }
};
