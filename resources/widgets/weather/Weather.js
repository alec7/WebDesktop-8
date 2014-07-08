/**
 * Created by zhaoyong on 2014-7-4.
 * 天气
 */
(function ($) {
    $.fn.weather = function (options) {
        if (this.length > 0) {
            this.each(function () {
                Weather.establish(this, options);
            });
        }
    };

    //天气
    var Weather = function () {
        return {
            _options: {}, //参数
            _weather: null,
            /**
             * 初始化
             * @param elem
             * @param options
             * @private
             */
            _initialize: function (elem, options) {
                this._setOptions(options);

                var weather = $('<div>', {
                    class: 'ui-weather',
                    html: [
                        $('<div>', {
                            class: 'ui-weather-currTemp'
                        }),
                        $('<div>', {
                            class: 'ui-weather-state'
                        }),
                        $('<div>', {
                            class: 'ui-weather-weatherInfo'
                        })
                    ]
                }).appendTo($(elem));

                this._weather = weather;
            },
            /**
             * 设置参数
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
             * @param elem
             * @param options
             */
            establish: function (elem, options) {
                if (elem && $(elem).length > 0) {
                    this._initialize(elem, options);
                }
            },
            /**
             * 展示天气
             */
            show: function () {
                //获取本地ip
            }
        }
    }();
})(jQuery);

