/**
 * Created by zhaoyong on 2014-6-23.
 */
(function($){
    'use strict';

    $(document).ready(function(){
        //加载数据文件data.json
        $.getJSON('data.json', function(data){
            if(data){
                //加载settings.json文件
                $.getJSON('settings.json', function(json){
                    if(json){
                        var webDesktopRes = 'resources/js/WebDesktop.js';
                        //动态加载js
                        Utils.$import('WebDesktop', webDesktopRes, function(){
                            //根据json数据创建WebDesktop
                            WebDesktop.data = data;
                            WebDesktop.go(json);
                        });
                    }
                });
            }
        });
    });
})(jQuery);
