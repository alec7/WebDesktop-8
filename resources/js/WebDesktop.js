/**
 * Created by zhaoyong on 2014-6-23.
 * WebDesktop web桌面
 */
(function ($, window) {
    'use strict';

    /**
     * WebDesktop Web桌面
     */
    var WebDesktop = function () {
        return {
            _version: '1.0',  //版本号
            _uuid: '',  //uuid唯一编号
            _options: {},  //配置属性
            /**
             * 桌面初始化
             * @param options
             * @private
             */
            _initialize: function (options) {
                this._uuid = '' + (new Date()).getTime();
                //设置选项
                this._setOptions(options);

                //构造desktop桌面
                var desktop = $('<div>', {
                    id: 'WebDesktop_' + this._uuid,
                    class: 'ui-desktop',
                    html: [
                        WebDesktop.Wallpaper.initialize(this._options), //桌面壁纸
                        WebDesktop.Taskbar.initialize(this._options)//桌面任务栏
                    ]
                }).appendTo($('body'));

                //加载默认主题
                this.setTheme(this._options['sys-theme']);
            },
            /**
             * 参数设置
             * @param options
             * @private
             */
            _setOptions: function (options) {
                //默认选项
                this._options = {
                };
                $.extend(this._options, options);
            },
            /**
             * 桌面启动方法
             * @param options
             */
            go: function (options) {
                this._initialize(options);
            },
            /**
             * 设置主题
             * @param themeId
             */
            setTheme: function (themeId) {
                if (!themeId) {
                    themeId = this._options['sys-theme'];
                }

                if (themeId && WebDesktop.data['Theme']) {
                    var webDesktop_theme = WebDesktop.data['Theme'][themeId];
                    if (webDesktop_theme) {
                        var css = webDesktop_theme['css'];
                        if (css) {
                            $import('WebDesktop_theme', css, function () {
                            });
                        }
                    }
                }
            }
        }
    }();

    /**
     * 桌面壁纸
     */
    WebDesktop.Wallpaper = function () {
        return {
            _options: {},  //配置属性
            _wallpaper: null,  //壁纸对象
            /**
             * 壁纸初始化
             * @param options
             * @private
             */
            _initialize: function (options) {
                //设置选项
                this._setOptions(options);

                //构造桌面壁纸
                var wallpaper = $('<div>', {
                    class: 'ui-desktop-wallpaper',
                    html: [
                        $('<img>', {
                            class: 'ui-desktop-wallpaper-img',
                            src: 'resources/img/s.gif'
                        })
                    ]
                });
                this._wallpaper = wallpaper;

                //设置默认壁纸
                this.setWallpaper(this._options['sys-wallpaper']);

                return wallpaper;
            },
            /**
             * 参数设置
             * @param options
             * @private
             */
            _setOptions: function (options) {
                //默认选项
                this._options = {
                };
                $.extend(this._options, options);
            },
            /**
             * 初始化
             * @param options
             */
            initialize: function (options) {
                return this._initialize(options);
            },
            /**
             * 设置壁纸
             * @param wallpaperId
             */
            setWallpaper: function (wallpaperId) {
                if (!wallpaperId) {
                    wallpaperId = this._options['sys-wallpaper'];
                }
                if (wallpaperId && WebDesktop.data['Wallpaper']) {
                    var wallpaper = WebDesktop.data['Wallpaper'][wallpaperId];
                    if (wallpaper && wallpaper['img']) {
                        $('img', $(WebDesktop.Wallpaper._wallpaper)).attr({'src': wallpaper['img']});
                    }
                }
            }
        }
    }();

    //桌面任务栏
    WebDesktop.Taskbar = function () {
        return {
            _options: {},  //配置属性
            _taskbar: null,  //任务栏对象
            /**
             * 任务栏初始化
             * @private
             */
            _initialize: function (options) {
                //设置属性
                this._setOptions(options);

                //任务栏dom元素
                var taskbar = $('<div>', {
                    class: 'ui-desktop-taskbar'
                });
                this._taskbar = taskbar;

                return taskbar;
            },
            /**
             * 参数设置
             * @param options
             * @private
             */
            _setOptions: function (options) {
                //默认选项
                this._options = {
                };
                $.extend(this._options, options);
            },
            /**
             * 初始化
             */
            initialize: function (options) {
                return this._initialize(options);
            }
        };
    }();

    window.WebDesktop = WebDesktop;
})(jQuery, window);