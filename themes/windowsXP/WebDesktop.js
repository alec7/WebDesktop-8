/**
 * Created by zhaoyong on 2014-6-23.
 * WebDesktop web桌面
 */
(function($, window){
    'use strict';

    alert('savsdv');

    var WebDesktop = function(){
        return {
            _version:'1.0',  //版本号
            _uuid:'',  //uuid唯一编号
            _options:{},  //配置属性
            _initial:function(options){  //桌面初始化
                this._uuid = '' + (new Date()).getTime();
                //设置选项
                this._setOptions(options);
            },
            _setOptions:function(options){  //选项设置
                //默认选项
                this._options = {
                };
                $.extend(this._options, options);
            },
            go:function(options){
                this._initial(options);
            }
        };
    }();

    window.webDesktop = WebDesktop;
})(jQuery, window);