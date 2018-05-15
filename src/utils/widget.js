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
};
