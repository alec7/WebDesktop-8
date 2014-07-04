/**
 * Created by zhaoyong on 2014-7-4.
 * 日历
 */
(function ($) {
    $.fn.calendar = function (options) {
        if (this.length > 0) {
            this.each(function () {
                Calendar.establish(this, options);
            });
        }
    };

    var Calendar = function () {
        return {
            _options: {}, //参数属性
            _calendar: null,
            /**
             * 初始化
             * @param elem
             * @param options
             * @private
             */
            _initialize: function (elem, options) {
                this._setOptions(options);

                var calendar = $('<div>', {
                    class: 'ui-calendar',
                    html: [
                        $('<div>', {
                            class: 'ui-calendar-pushpin'
                        }),
                        $('<div>', {
                            class: 'ui-calendar-month',
                            html: function () {
                                var month = new Date().getMonth();
                                var locale = Calendar._options['locale'];
                                var language = locale || Utils.$browserLanguage();
                                if (!language) {
                                    language = 'en_US';  //默认
                                }
                                if (language && Utils.$month['Month']) {
                                    var monthMessage = Utils.$month['Month'][month];
                                    if (monthMessage && monthMessage[locale]) {
                                        for (var key in monthMessage) {
                                            if (monthMessage.hasOwnProperty(key) && key.toLowerCase().indexOf(language.toLowerCase()) != -1) {
                                                return monthMessage[key];
                                            }
                                        }
                                    }
                                }

                                return month + 1;
                            }
                        }),
                        $('<div>', {
                            class: 'ui-calendar-date',
                            html:function () {
                                return new Date().getDate();
                            }
                        })
                    ]
                }).appendTo(elem);

                this._calendar = calendar;
            },
            /**
             * 设置参数
             * @param options
             * @private
             */
            _setOptions: function (options) {
                //默认选项
                this._options = {
                    lcoale: 'zh_CN'
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
                    return true;
                }
            }
        };
    }();
})(jQuery);
