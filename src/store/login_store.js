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
  },
  postUserLogin(params, callback) {
    params.path = 'data';
    params.assign = {
      betweenDays: '',
      cardType: '',
      cid: '',
      companyUser: '',
      idCard: '',
      phone: '',
      qScore: '',
      qTime: '',
      result: false,
      sfwzytzz: '',
      user: '',
      userId: '',
      userType: '',
    };
    request(params, 'POST', callback);
  }
};
