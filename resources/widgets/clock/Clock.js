/**
 * Created by zhaoyong on 2014-7-3.
 * 时钟
 */
(function ($) {
    $.fn.clock = function (options) {
        console.log(this.length);
        if (this.length > 0) {
            this.each(function () {
                Clock.establish(this, options)
            });
        }
    };

    //时钟
    var Clock = function () {
        return {
            _options: {}, //参数
            _clock: null,
            _initialize: function (elem, options) {
                this._setOptions(options);

                // 创建clock
                var clock = $('<div>', {
                    class: 'ui-widget-clock',
                    html: [
                        $('<div>', {
                            class: 'ui-widget-clock-centre'
                        }),
                        $('<div>', {
                            class: 'ui-widget-clock-hourhand'
                        }),
                        $('<div>', {
                            class: 'ui-widget-clock-minutehand'
                        }),
                        $('<div>', {
                            class: 'ui-widget-clock-secondhand'
                        }),
                        $('<div>', {
                            class: 'ui-widget-clock-mark'
                        })
                    ]
                }).appendTo(elem);

                //添加刻度
                $('.ui-widget-clock-mark', clock).html(function () {
                    var children = [];
                    //设置时钟高度和宽度，保证宽度和高度相等
                    var width = $(clock).width() || that._options.width, height = $(clock).height() || that._options.height;
                    if (typeof width == typeof height) {
                        width >= height ? $(clock).width(height).height(height) : $(clock).height(width).width(width);
                    }
                    //计算圆半径
                    var r = $(clock).width() / 2;
                    if (r > 0) {
                        //时钟刻度
                        for (var i = 1; i < 61; i++) {
                            var mark = $('<b>', {
                            });

                            // 利用正弦定理计算刻度的定位
                            var left = r + r * (Math.sin(i * 6 * 2 * Math.PI / 360));
                            var top = r - r * (Math.sin((90 - i * 6) * 2 * Math.PI / 360));
                            //计算转动的角度
                            var transform = 'rotate(' + (i * 6) + 'deg)';
                            mark.css({top: top, left: left, 'transform': transform, '-webkit-transform': transform, '-mon-transform': transform, '-ms-transform': transform, '-o-transform': transform });

                            if (i % 5 == 0) {
                                //小时刻度, 同时将数字转正
                                transform = 'rotate(' + -(i * 6) + 'deg)';
                                mark.addClass('ui-widget-clock-mark-hour').html($('<i>', {
                                    html: i / 5
                                }).css({'transform': transform, '-webkit-transform': transform, '-mon-transform': transform, '-ms-transform': transform, '-o-transform': transform }));
                            } else {
                                //分钟刻度
                                mark.addClass('ui-widget-clock-mark-minute');
                            }
                            children.push(mark);
                        }
                    }
                    return children;
                });

                this._clock = clock;
            },
            _setOptions: function (options) {
                //默认选项
                this._options = {
                    width: 140,  //默认时钟宽度
                    height: 140  //默认时钟高度
                };
                $.extend(this._options, options);
            },
            /**
             * 设置时针位置
             * @param date
             * @private
             */
            _setHourHand: function (date) {
                if (!date) {
                    date = new Date();
                }
                var hours = date.getHours(), minutes = date.getMinutes();
                //时针
                var transform = 'rotate(' + (360 / 12 * hours + 30 / 60 * minutes) + 'deg)';
                $('.ui-widget-clock-hourhand', this._clock).css({'transform': transform, '-webkit-transform': transform, '-mon-transform': transform, '-ms-transform': transform, '-o-transform': transform });
            },
            /**
             * 设置分针
             * @param date
             * @private
             */
            _setMinuteHand: function (date) {
                if (!date) {
                    date = new Date();
                }
                var minutes = date.getMinutes(), seconds = date.getSeconds();
                // 分针
                var transform = 'rotate(' + (360 / 60 * minutes + 360 / 60 / 60 * seconds) + 'deg)';
                $('.ui-widget-clock-minutehand', this._clock).css({'transform': transform, '-webkit-transform': transform, '-mon-transform': transform, '-ms-transform': transform, '-o-transform': transform });
            },
            /**
             * 设置秒针
             * @param date
             * @private
             */
            _setSecondHand: function (date) {
                if (!date) {
                    date = new Date();
                }
                var seconds = date.getSeconds();
                //秒针
                var transform = 'rotate(' + (360 / 60 * seconds) + 'deg)';
                $('.ui-widget-clock-secondhand', this._clock).css({'transform': transform, '-webkit-transform': transform, '-mon-transform': transform, '-ms-transform': transform, '-o-transform': transform });
            },
            /**
             * 创建Clock
             * @param elem 页面节点
             * @param options
             * @returns {*}
             */
            establish: function (elem, options) {
                if (elem && $(elem).length > 0) {
                    this._initialize(elem, options);
                }
            },
            /**
             * 启动，让时钟走动
             */
            run: function () {
                //设置指针位置
                var now = new Date();
                this._setHourHand(now);
                this._setMinuteHand(now);
                this._setSecondHand(now);

                var that = this;
                //设置时针、分针、秒针的角度、位置
                setInterval(function () {
                    that._setHourHand(new Date());
                }, 3600000);
                setInterval(function () {
                    that._setMinuteHand(new Date());
                }, 60000);
                setInterval(function () {
                    that._setSecondHand(new Date());
                }, 1000);
            }
        };
    }();
})(jQuery);
