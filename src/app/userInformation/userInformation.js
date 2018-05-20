/**
 * 基本信息逻辑
 */

'use strict';
import './userInformation.less';
import userInformationHtml from '../../page/userInformation.html';
import userInformationTpl from './userInformation.tpl.html';
import Tool from '../../utils/tool';
import widget from '../../utils/widget';
import '../../components/user-info/user-info.less';
import userInfoListTpl from '../../components/user-info/user-info.html';
import userInfoStore from '../../store/userBasicInfo_store';

export default class UserInformation extends widget {
  constructor() {
    super();
  }

  init() {
    let viewMainDom = $('.view-main').attr('data-page');
    if(viewMainDom !== 'userInformation') {
      $('.view-main').attr('data-page', 'userInformation');
      $('.pages').append(userInformationHtml);
      $('.userInformation-page').addClass('page-on-center')
    }
    let _userInformationTpl = Tool.renderTpl(userInformationTpl);
    $('.userInformation-page').append($(_userInformationTpl));

    this.userBasicInfo();
  }
  /*
   获取用户基本信息
   */
  userBasicInfo() {
    userInfoStore.postUserZcJbxx({
      data: {
        action: 'UserZcJbxx',
        method: 'selectUserZcJbxxByIdCard',
        cid: sessionStorage.getItem('cid'),
        user_type: sessionStorage.getItem('userType'),
        id_card: sessionStorage.getItem('idCard'),
      }
    }, (res) => {
      console.log(res);
      let _userInfoListTpl = Tool.renderTpl(userInfoListTpl, res['yongHuJbxx']);
      $('.userBasicInfo').html('').append($(_userInfoListTpl));
    })
  }
};
