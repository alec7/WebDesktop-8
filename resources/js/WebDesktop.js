/**
 * Created by zhaoyong on 2014-6-23.
 * WebDesktop web桌面
 */
(function($, window){
    'use strict';

    var WebDesktop = function(){
    };
    WebDesktop.prototype = {
        _version:'1.0',  //版本号
        _uuid:'',  //uuid唯一编号
        _data:null, //数据集合
        _options:{},  //配置属性
        _wallpaper:null,  //桌面壁纸对象
        _taskbar:null,  //任务栏对象
        /**
         * 桌面初始化
         * @param data
         * @param options
         * @private
         */
        _initialize:function(data, options){
            this._uuid = '' + (new Date()).getTime();
            this._data = data;
            //设置选项
            this._setOptions(options);

            //构造desktop桌面
            var desktop = $('<div>', {
                id:'WebDesktop_' + this._uuid,
                class:'ui-desktop'
            }).appendTo($('body'));

            //桌面壁纸
            this._wallpaper = new WebDesktop.Wallpaper();
            $(desktop).append(this._wallpaper.initialize(options));

            //桌面任务栏
            this._taskbar = new WebDesktop.Taskbar();
            $(desktop).append(this._taskbar.initialize());
        },
        /**
         * 参数设置
         * @param options
         * @private
         */
        _setOptions:function(options){
            //默认选项
            this._options = {
            };
            $.extend(this._options, options);
        },
        /**
         * 桌面启动方法
         * @param data
         * @param options
         */
        go:function(data, options){
            this._initialize(data, options);
        },
        /**
         * 设置主题
         * @param themeId
         */
        setTheme:function(themeId){
        },
        /**
         * 设置壁纸
         * @param wallpaper
         */
        setWallpaper:function(wallpaper){
        }
    };

    //桌面壁纸
    WebDesktop.Wallpaper = function(){
    };
    WebDesktop.Wallpaper.prototype = {
        _uuid:'',  //uuid唯一编号
        _options:{},  //配置属性
        _wallpaper:null,  //壁纸对象
        /**
         * 壁纸初始化
         * @param options
         * @private
         */
        _initialize:function(options){
            this._uuid = '' + (new Date()).getTime();
            //设置选项
            this._setOptions(options);

            //构造桌面壁纸
            var wallpaper = $('<div>', {
                id:'WebDesktop_Wallpaper_' + this._uuid,
                class:'ui-desktop-wallpaper',
                html:[
                    $('<img>', {
                        class:'ui-desktop-wallpaper-img',
                        src:'resources/img/s.gif'
                    })
                ]
            });
            this._wallpaper = wallpaper;

            return wallpaper;
        },
        /**
         * 参数设置
         * @param options
         * @private
         */
        _setOptions:function(options){
            //默认选项
            this._options = {
            };
            $.extend(this._options, options);
        },
        /**
         * 初始化
         * @param options
         */
        initialize:function(options){
            return this._initialize(options);
        }
    };

    //桌面任务栏
    WebDesktop.Taskbar = function(){
    };
    WebDesktop.Taskbar.prototype = {
        _uuid:'',  //uuid唯一编号
        _taskbar:null,  //任务栏对象
        /**
         * 任务栏初始化
         * @private
         */
        _initialize:function(){
            this._uuid = '' + (new Date()).getTime();

            //任务栏dom元素
            var taskbar = $('<div>', {
                id:'WebDesktop_Taskbar_' + this._uuid,
                class:'ui-desktop-taskbar'
            });
            this._taskbar = taskbar;

            return taskbar;
        },
        /**
         * 初始化
         */
        initialize:function(){
            return this._initialize();
        }
    };

    window.WebDesktop = WebDesktop;
})(jQuery, window);