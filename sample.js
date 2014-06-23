/**
 * Created by zhaoyong on 2014-6-23.
 */
(function($){
    'use strict';

    $(document).ready(function(){
        //加载WebDesktop.json文件
        $.getJSON('settings.json', function(json){
            if(json){
                //根据json数据创建WebDesktop
                var theme = json['sys-theme'];
                if(theme){
                    var webDesktop_theme = 'themes/' + theme +'/WebDesktop.js';
                    //动态加载js
                    $import('WebDesktop', webDesktop_theme, function(){
                        //创建WebDesktop
                        WebDesktop.go(json);
                    });
                }
            }
        });
    });
})(jQuery);
