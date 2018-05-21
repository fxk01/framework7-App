/*
 valid
 */
import jQuery from 'jquery'

'use strict';
(function($){
  $.fn.disabled = function(status){
    var _ts = $(this);
    if(status==true) {
      _ts.addClass('disabled');
      _ts.attr('disabled',true)
    }
    if(status==false) {
      _ts.removeClass('disabled');
      _ts.attr('disabled',false)
    }

    return _ts.hasClass('disabled') || typeof _ts.attr('disabled')!='undefined'
  };
  $.fn.valid = function(vas, callback){
    var form = $(this);
    var ctrls = form.find('[data-valid-control]');
    var isDiy = false;

    $.each(vas, function(key, val){
      if(vas[key].hasOwnProperty('success')) {
        return !(isDiy = true)
      }
    });

    $.each(ctrls, function(index, ele){
      var key = $(ele).attr('data-valid-control');
      $(ele).on('change', function(){
        if(!test(ele, key)) $(ele).focus()
      })
    });

    form.on('submit', function(ev){
      if(form.find('[type="submit"]').disabled()) {
        ev.preventDefault()
      }
      var vResult = true;
      var isFocus = true;
      $.each(ctrls, function(index, ele){
        var key = $(ele).attr('data-valid-control');
        if(!test(ele, key)) {
          if(isFocus) {
            $(ele).focus();
            isFocus = false
          }
          vResult = false;
          if(!isDiy) return false
        }
      });
      if(callback&&callback.constructor===Function) {
        ev.preventDefault();
        if(vResult) callback(ev, form)
      } else {
        if(!vResult) ev.preventDefault()
      }
    });

    function test(ele, key) {
      var va = vas[key];
      var errDom = isDiy ? null : form.find('[data-valid-error="'+key+'"]');
      if($(ele).prop('type')=='radio' || $(ele).prop('type')=='checkbox') {
        return $.inRange(form.find('[data-valid-control="'+key+'"]:checked').length, va.norm) ?
          fnSuccess($(ele), va, errDom) : fnError($(ele), va, errDom, va.error)
      } else if(va.norm.context) {
        return $(ele).val()==va.norm.val()&&$(ele).val().length>0 ?
          fnSuccess($(ele), va, errDom) : fnError($(ele), va, errDom, va.error)
      }else {
        return va.norm.test($(ele).val()) ?
          fnSuccess($(ele), va, errDom) : fnError($(ele), va, errDom, va.error)
      }
    }

    function fnError(ts, va, errDom, error) {
      if(isDiy) {
        va.error(ts)
      } else {
        errDom.addClass('active').html(error)
      }
      return false
    }

    function fnSuccess(ts, va, errDom) {
      if(isDiy) {
        va.success(ts)
      } else {
        setTimeout(function(){
          errDom.removeClass('active').html('')
        }, 200)
      }
      return true
    }
  };
  $.inRange = function(num, range){
    if(typeof range=='string') range = range.replace(/ /g, '');
    //m
    if(!/^\(|\)|\[|\]$/.test(range)) {
      return num==parseFloat(range)
      //(m,)
    } else if(/^\(\d*\.?\d*,[\)\]]$/.test(range)) {
      return num>parseFloat(range.replace(/\(|,|\)/g,''))
      //(,n)
    } else if(/^[\[\(],\d*\.?\d*\)$/.test(range)) {
      return num<parseFloat(range.replace(/\(|,|\)/g,''))
      //(m,n)
    } else if(/^\(\d*\.?\d*,\d*\.?\d*\)$/.test(range)) {
      var arr = range.replace(/\(|\)/g,'').split(',');
      return num>parseFloat(arr[0]) && num<parseFloat(arr[1])
      //[m,)
    } else if(/^\[\d*\.?\d*,[\)\]]$/.test(range)) {
      return num>=parseFloat(range.replace(/\[|,|\)/g,''))
      //(,n]
    } else if(/^[\[\(],\d*\.?\d*\]$/.test(range)) {
      return num<=parseFloat(range.replace(/\(|,|\]/g,''))
      //[m,n]
    } else if(/^\[\d*\.?\d*,\d*\.?\d*\]$/.test(range)) {
      var arr = range.replace(/\[|\]/g,'').split(',');
      return num>=parseFloat(arr[0]) && num<=parseFloat(arr[1])
      //(m,n]
    } else if(/^\(\d*\.?\d*,\d*\.?\d*\]$/.test(range)) {
      var arr = range.replace(/\(|\]/g,'').split(',');
      return num>parseFloat(arr[0]) && num<=parseFloat(arr[1])
      //[m,n)
    } else if(/^\[\d*\.?\d*,\d*\.?\d*\)$/.test(range)) {
      var arr = range.replace(/\[|\)/g,'').split(',');
      return num>=parseFloat(arr[0]) && num<parseFloat(arr[1])
    } else {
      return false
    }
  }
})(jQuery);
