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
                        WebDesktop.Wallpaper.establish(this._options), //桌面壁纸,
                        WebDesktop.DesktopWrapper.establish(this._options), //桌面
                        WebDesktop.Sidebar.establish(this._options), //侧边栏
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
                    themeId = this._options['sys-themes'];
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

    /**
     * 桌面包装器
     */
    WebDesktop.DesktopWrapper = function () {
        return {
            _options: {},  //配置属性
            _wrapper: null,
            /**
             * 任务栏初始化
             * @private
             */
            _initialize: function (options) {
                //设置属性
                this._setOptions(options);

                var wrapper = $('<div>', {
                    class: 'ui-desktop-wrapper'
                });
                this._wrapper = wrapper;

                return wrapper;
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
     * 桌面侧边栏
     */
    WebDesktop.Sidebar = function () {
        return {
            _options: {},  //配置属性
            _sidebar: null,
            /**
             * 任务栏初始化
             * @private
             */
            _initialize: function (options) {
                //设置属性
                this._setOptions(options);

                var that = this;
                var sidebar = $('<div>', {
                    class: 'ui-desktop-sidebar',
                    html: function () {
                        var children = [];
                        if (that._options['sidebar']) {
                            var widgets = that._options['sidebar']['widgets'];
                            if (widgets) {
                                for (var widgetId in widgets) {
                                    if (widgets.hasOwnProperty(widgetId) && WebDesktop.data && WebDesktop.data["Widget"]) {
                                        var widget = WebDesktop.data["Widget"]['' + widgetId];
                                        if (!widget) {
                                            break;
                                        }
                                        //加载widget的js
                                        Utils.$import(widgetId + '_js', widget['js'], function (widgetId, widget) {
                                            return function(){
                                                var widgetSettings = widgets[widgetId];
                                                WebDesktop.Widget.establish(sidebar, widget, widgetSettings);
                                            };
                                        }(widgetId, widget))
                                    }
                                }
                            }
                        }
                        return children;
                    }
                }).on({
                    'mouseover': function () {
                        $(this).addClass('ui-desktop-sidebar-hover');
                    },
                    'mouseout': function () {
                        $(this).removeClass('ui-desktop-sidebar-hover');
                    }
                });
                this._sidebar = sidebar;

                return sidebar;
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
                        WebDesktop.StartMenubar.establish(this._options),
                        WebDesktop.SystemTools.showDesktop(),
                        $('<div>', {
                            class: 'ui-desktop-taskbar-tool',
                            html: [
                                WebDesktop.SystemTools.volume().addClass('ui-desktop-taskbar-tool-item'),
                                WebDesktop.SystemTools.clock(this._options).addClass('ui-desktop-taskbar-tool-item')
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
     * 开始菜单
     */
    WebDesktop.StartMenubar = function () {
        return {
            _options: {},  //配置属性
            _startMenubar: null,  //开始菜单对象
            /**
             * 开始菜单
             * @private
             */
            _initialize: function (options) {
                //设置属性
                this._setOptions(options);

                //开始菜单栏dom元素
                var _startMenubar = $('<div>', {
                    class: 'ui-desktop-startMenubar',
                    html: [
                        $('<div>', {
                            html: 'Start',
                            class: 'ui-desktop-startMenubar-button'
                        }),
                        $('div', {
                            class: 'ui-desktop-startMenubar-ui'
                        })
                    ]
                });

                this._startMenubar = _startMenubar;

                return _startMenubar;
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
            }
        }
    }();

    /**
     * 系统工具
     * @constructor
     */
    WebDesktop.SystemTools = function () {
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
                        $(clock).html(Utils.$datetimeFormat(new Date(), 'HH:mm:ss', locale)).attr('title', Utils.$datetimeFormat(new Date(), format, locale));
                    }, 1000)
                });
                return clock;
            },
            /**
             * 音量控制
             * @returns {*}
             */
            volume: function () {
                return $('<div>', {
                    class: 'ui-desktop-tool-volume'
                }).ready(function () {
                }).click(function () {
                    $(this).toggleClass('ui-desktop-tool-volume-mute');
                });
            },
            /**
             * 显示桌面
             */
            showDesktop: function () {
                return $('<div>', {
                    class: 'ui-desktop-tool-showdesktop'
                }).click(function () {
                });
            }
        };
    }();

    /**
     * 小部件API
     * @constructor
     */
    WebDesktop.Widget = function () {
        return {
            /**
             * 创建Widget
             * @param elem
             * @param widget
             * @param widgetSettings
             */
            establish: function (elem, widget, widgetSettings) {
                if (elem && widget) {
                    if (widgetSettings) {
                        var themeId = widgetSettings['theme'];
                        if (themeId) {
                            var themes = widget['theme'];
                            if (themes) {
                                var theme = themes[themeId];
                                if (theme) {
                                    var css = theme['css'];
                                    if (css) {
                                        //加载widget主题
                                        Utils.$import(widget['id'] + '_css', css, function () {
                                        });
                                    }
                                }
                            }
                        }
                    }

                    //加载Widget
                    $('<div>', {
                        id: 'widget_' + widget['id'],
                        class: 'ui-desktop-widget',
                        html: [
                            $('<div>', {
                                class: 'ui-desktop-widget-toollist',
                                html: [
                                    $('<div>', {
                                        title: '移除',
                                        class: 'ui-desktop-widget-remove'
                                    }).click(function () {
                                        $('#widget_' + widget['id']).fadeOut();
                                    }),
                                    $('<div>', {
                                        title: '设置',
                                        class: 'ui-desktop-widget-setup'
                                    }).click(function () {
                                    })
                                ]
                            }).hide()
                        ]
                    }).appendTo(elem).html(function () {
                        try {
                            //widget主体
                            var fn = eval('$.fn.' + widget['id']);
                            if (fn && 'function' == typeof fn) {
                                fn.call($(this), widgetSettings);
                            }
                        } catch (e) {
                        }
                    }).on({
                        'mouseover': function () {
                            $('.ui-desktop-widget-toollist', this).show();
                        },
                        'mouseout': function () {
                            $('.ui-desktop-widget-toollist', this).hide();
                        }
                    });
                }
            }
        };
    }();

    /**
     * 应用API
     * @constructor
     */
    WebDesktop.Application = function () {
        return $('<div>', {
            class: 'ui-desktop-application'
        })
    }();

    window.WebDesktop = WebDesktop;
})
(jQuery, window);