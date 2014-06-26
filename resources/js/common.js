/**
 * Created by zhaoyong on 2014-6-23.
 *公用js
 */
(function ($, window) {
    'use strict';

    /**
     * 工具类
     * @constructor
     */
    var Utils = function () {
        return {
            /**
             * 动态导入静态资源文件js/css
             * @param rId 资源id，主要是为了避免重复加载
             * @param res 资源文件
             * @param callback 回调函数
             */
            $import: function (rId, res, callback) {
                if (res && 'string' == typeof res) {
                    if (rId) {
                        if ($($('#' + rId), $('head')).length > 0) {
                            return;
                        }
                    }

                    //加载资源文件
                    var sType = res.substring(res.lastIndexOf('.') + 1);
                    // 支持js/css
                    if (sType && ('js' == sType || 'css' == sType)) {
                        var isScript = (sType == 'js');
                        var tag = isScript ? 'script' : 'link';

                        var head = document.getElementsByTagName('head')[0];
                        // 创建节点
                        var linkScript = document.createElement(tag);
                        linkScript.type = isScript ? 'text/javascript' : 'text/css';
                        linkScript.charset = 'UTF-8';
                        if (!isScript) {
                            linkScript.rel = 'stylesheet';
                        }
                        isScript ? linkScript.src = res : linkScript.href = res;
                        if (callback && 'function' == typeof callback) {
                            if (linkScript.addEventListener) {
                                linkScript.addEventListener('load', function () {
                                    callback.call();
                                }, false);
                            } else if (linkScript.attachEvent) {
                                linkScript.attachEvent('onreadystatechange', function () {
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
            },
            /**
             * 日期格式化
             * @param date Date
             * @param format 格式化字符串
             */
            $dateFormat:function(date, format){
                if(!date){
                    date = new Date();
                }
            }
        };
    }();

    window.Utils = Utils;
})
(jQuery, window);
