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
            /**
             * 初始化
             * @param elem
             * @param options
             * @private
             */
            _initialize: function (elem, options) {
                this._setOptions(options);
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
            }
        }
    }();
})(jQuery);

