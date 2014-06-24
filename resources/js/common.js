/**
 * Created by zhaoyong on 2014-6-23.
 *公用js
 */
(function($, window){
    'use strict';

    /**
     * 动态导入静态资源文件js/css
     */
    var $import = function(){
        return function(rId, res, callback){
            if(res && 'string' == typeof res){
                if(rId){
                    if($($('#' + rId), $('head')).length>0){
                        return;
                    }
                }

                //加载资源文件
                var resource = {};
                var sType = res.substring(res.lastIndexOf('.') + 1);
                // 支持js/css
                if(sType && ('js' == sType || 'css' == sType)){
                    var isScript = (sType == 'js');
                    var tag = isScript ? 'script' : 'link';
                    var attrs = isScript ? {
                        'type':'text/javascript',
                        'src':'' + resource['src']
                    } : {
                        'type':'text/css',
                        'rel':'stylesheet',
                        'href':'' + resource['src']
                    };

                    //构造元素
                    $('<' + tag + '>', $.extend(attrs, {
                        id: rId ? rId : ''
                    })).ready(function(){
                        if('complete' == this.readyState){
                            callback.call();
                        }
                    }).appendTo($('head'));
                }
            }
        };
    }();

    window.$import = $import;
})(jQuery, window);
