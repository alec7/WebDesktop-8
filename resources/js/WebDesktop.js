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
                        WebDesktop.Wallpaper.establish(this._options), //桌面壁纸
                        WebDesktop.Taskbar.establish(this._options)//桌面任务栏
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
                            Utils.$import('WebDesktop_theme', css, function () {
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
                    ]
                });
                this._wallpaper = wallpaper;

                //设置默认壁纸
                this.setWallpaper(this._options['sys-wallpaper']);

                //添加监听
                this._addEventListener();

                return wallpaper;
            },
            /**
             * 添加事件监听
             * @private
             */
            _addEventListener: function () {
                var win = $(window);
                win.on('resize', function () {
                    Utils.$imgSelfAdaption($('.ui-desktop-wallpaper-img', $(WebDesktop.Wallpaper._wallpaper)), this);
                });
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
             * 创建
             * @param options
             */
            establish: function (options) {
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

                var wallpaperRes = 'resources/img/s.gif';
                if (wallpaperId && WebDesktop.data['Wallpaper']) {
                    var wallpaper = WebDesktop.data['Wallpaper'][wallpaperId];
                    if (wallpaper && wallpaper['img']) {
                        wallpaperRes = wallpaper['img'];
                    }
                }
                if (wallpaperRes) {
                    var wallpaperImg = $('.ui-desktop-wallpaper-img', $(WebDesktop.Wallpaper._wallpaper));
                    if (wallpaperImg.length <= 0) {
                        wallpaperImg = $('<img>', {
                            class: 'ui-desktop-wallpaper-img',
                            src: '' + wallpaperRes
                        }).appendTo(WebDesktop.Wallpaper._wallpaper);
                    }
                    wallpaperImg.on('load', function () {
                        if (this.complete) {
                            Utils.$imgSelfAdaption(this, window);
                        }
                    });
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
                    class: 'ui-desktop-taskbar',
                    html: [
                        $('<div>', {
                            class: 'ui-desktop-taskbar-tool',
                            html: [
                                WebDesktop.Tools.volume(options).addClass('ui-desktop-taskbar-tool-item'),
                                WebDesktop.Tools.clock(this._options).addClass('ui-desktop-taskbar-tool-item')
                            ]
                        })
                    ]
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
             * 创建
             * @param options
             * @returns {*}
             */
            establish: function (options) {
                return this._initialize(options);
            }
        };
    }();

    /**
     * 工具
     * @constructor
     */
    WebDesktop.Tools = function () {
        return {
            /**
             * 时钟显示
             * @param options 参数
             * @returns {*}
             */
            clock: function (options) {
                var clock = $('<div>', {
                    class: 'ui-desktop-tool-clock'
                }).ready(function () {
                    var format = '';
                    var locale = '';
                    if (WebDesktop.data['Dictionary'] && WebDesktop.data['Dictionary']['Datetime']) {
                        if (options['sys-locale']) {
                            var value = WebDesktop.data['Dictionary']['Datetime'][options['sys-locale']];
                            if (value) {
                                format = value['format'];
                                locale = value['locale'];
                            }
                        }
                    }
                    setInterval(function () {
                        $(clock).html(Utils.$datetimeFormat(new Date(), 'yyyy-MM-dd HH:mm', locale)).attr('title', Utils.$datetimeFormat(new Date(), format, locale));
                    }, 1000)
                });
                return clock;
            },
            /**
             * 音量控制
             * @param options
             * @returns {*}
             */
            volume: function (options) {
                var volume = $('<div>', {
                    class: 'ui-desktop-tool-volume'
                }).ready(function () {
                }).click(function(){
                    $(this).toggleClass('ui-desktop-tool-volume-mute');
                });
                return volume;
            },

        };
    }();

    window.WebDesktop = WebDesktop;
})(jQuery, window);