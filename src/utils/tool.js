'use strict';

import dateFormat from 'date-fns/format';

export default {
  bindEvents(events){
    for (let i = 0, l = events.length; i < l; i++) {
      if (!events[i].element) {
        $(events[i].target).on(events[i].event, events[i].handler)
      } else {
        $(events[i].element).on(events[i].event, events[i].target, events[i].handler)
      }
    }
  },
  renderTpl(tpl, data){
    return Template7.compile(tpl)(data);
  },
  publishTime(date){
    return dateFormat(date, polyglot.t('format.date'));
  },
  parseURL(parameter) {
    let _url = window.location.href.split('?')[1];
    if (_url !== undefined) {
      let _index;
      let _arr = _url.split('&');
      for (let i = 0, _len = _arr.length; i < _len; i++) {
        if (_arr[i].indexOf(parameter + '=') >= 0) {
          _index = i;
          break;
        } else {
          _index = -1;
        }
      }
      if (_index >= 0) {
        let _key = _arr[_index].split('=')[1];
        return _key;
      }
    }
  }
};
