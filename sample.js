/**
 * Created by zhaoyong on 2014-6-23.
 */
(function($){
    $(document).ready(function(){
        //加载WebDesktop.json文件
        var jsonFile = 'WebDesktop.json';
        $.getJSON(jsonFile, function(json){
            document.write('sdvdsv');
            for(var prop in json){
                alert(prop + ':' + json[prop])
            }
        });
    });
})(jQuery);
