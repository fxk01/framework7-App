/**
 * 公共类
 */

export default class widget {
  /*
   解析cid
   */
  analysisCid(page) {
    const pageUrl = page.url;
    let getStorageCid = localStorage.getItem('cid');
    if(getStorageCid === null) {
      if(pageUrl.indexOf('/login') > 0) {
        let setCid = page.query.cid;
        let code = [];
        if(setCid.indexOf('T') > 0) {
          let param = setCid.split('T');
          this.cid = param[0];
          sessionStorage.setItem('company_type', param[1]);
        }
        let d = this.cid.split('D');
        for(let i = 1, l = d.length; i < l; i++) {
          code += String.fromCharCode(parseInt(d[i], 6));
          let StringCid = code;
          if(StringCid === '') {
            window.location.href = `http://${window.location.host}/dist`;
            return false;
          } else{
            sessionStorage.setItem('cid', StringCid.substring(1));
          }
        }
      }
    }
  }
  formatNumber(v, precision) {
    if (precision === 0) {
      return v.toFixed(precision).replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    } else {
      return v.toFixed(precision).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    }
  }
  formatMoney(v) {
    let label = v.toFixed(0);
    if(v >= 1000000000) {
      label = (v / 10000000).toFixed(0) + 'kw';
    } else if(v >= 1000000) {
      label = (v / 10000).toFixed(0) + 'w';
    } else if(v >= 100000) {
      label = (v / 1000).toFixed(0) + 'k';
    }
    return label;
  }
  removeArrValue(arr1) {
    let arr = [];
    for(let i = 0; i < arr1.length; i++){
      if(arr.indexOf(arr1[i]) === -1){
        arr.push(arr1[i]);
      }
    }
    return arr;
  }
  getReadPower() {
    if (sessionStorage.getItem('userType') !== '' && sessionStorage.getItem('userType') !== null) {
      sessionStorage.setItem('readPower', 1);
      return 1;
    } else {
      sessionStorage.setItem('readPower', 0);
      return 0;
    }
  }
  open(url, key, value, method) {
    this.getOpenUrl(url, key, value);
    // document.location = this.getOpenUrl(url, key, value);
  }
  getOpenUrl(url, key, value, method) {
    let data = {};
    data[key] = value;
    data = encodeURIComponent(JSON.stringify(data));
    if (method === 'url') {
      sessionStorage.setItem('_openData', null);
      return url + '?data=' + data + '&tag=' + (new Date()).getTime();
    } else {
      sessionStorage.setItem('_openData', data);
      return url;
    }
  }
  getSessionParams(key) {
    let data = this.getUrlParameter('data');
    if (data === null) {
      data = sessionStorage.getItem('_openData');
    }
    if (data !== null) {
      try {
        data = JSON.parse(decodeURIComponent(data));

        if (data !== null && data[key] !== null) {
          return data[key];
        }
      } catch (err) {
      }
    }
    let strParams = sessionStorage.getItem('sessionParams.' + key);

    if (strParams !== null) {
      return JSON.parse(strParams);
    } else {
      return {};
    }
  }
  getUrlParameter(name) {
    return this.urlParameters[name];
  }
  loadUrlParameters() {
    this.urlParameters = {};
    if (window.location.href.indexOf('?') > 0) {
      let pairs = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

      for (let i = 0; i < pairs.length; i++) {
        let pair = pairs[i].split('=');
        this.urlParameters[pair[0]] = pair[1];
      }
    }
  }
  formatUnitNetWorth(v) {
    return v.toFixed(4);
  }
};
