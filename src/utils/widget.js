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
};
