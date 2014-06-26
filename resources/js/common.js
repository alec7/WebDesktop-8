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
                var sType = res.substring(res.lastIndexOf('.') + 1);
                // 支持js/css
                if(sType && ('js' == sType || 'css' == sType)){
                    var isScript = (sType == 'js');
                    var tag = isScript ? 'script' : 'link';

                    var head = document.getElementsByTagName('head')[0];
                    // 创建节点
                    var linkScript = document.createElement(tag);
                    linkScript.type = isScript ? 'text/javascript' : 'text/css';
                    linkScript.charset = 'UTF-8';
                    if(!isScript){
                        linkScript.rel = 'stylesheet';
                    }
                    isScript ? linkScript.src = res : linkScript.href = res;
                    if(callback && 'function' == typeof callback){
                        if (linkScript.addEventListener){
                            linkScript.addEventListener('load', function(){
                                callback.call();
                            }, false);
                        } else if (linkScript.attachEvent) {
                            linkScript.attachEvent('onreadystatechange', function(){
                                var target = window.event.srcElement;
                                if (target.readyState == 'complete') {
                                    callback.call();
                                }
                            });
                        }
                    }
                    head.appendChild(linkScript);
                }
            }
        };
    }();

    window.$import = $import;
})(jQuery, window);
