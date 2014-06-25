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
                        $import('WebDesktop', webDesktopRes, function(){
                            //根据json数据创建WebDesktop
                            (new WebDesktop()).go(data, json);

                            //加载主题
                            var themeId = json['sys-theme'];
                            if(themeId && data['Theme']){
                                var webDesktop_theme = data['Theme'][themeId];
                                if(webDesktop_theme){
                                    var css = webDesktop_theme['css'];
                                    if(css){
                                        $import('WebDesktop_theme', css, function(){});
                                    }
                                }
                            }
                        });
                    }
                });
            }
        });
    });
})(jQuery);
