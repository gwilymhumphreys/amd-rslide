define(['app/filler', 'jqueryMobileEvents'],

    function(Filler) {

        return (function($) {

            // RSlide class
            var RSlide = function(element, options) {

                this.$element = $(element);
                this.$container = this.$element.find('ul:first');
                this.$items = this.$container.children();

                this.options = options;

                this.offset = 0;
                this.offsetItems = 0;

                this.filler = new Filler(this.$element, this.$container, this.$items, this.options);

                this.fit();
                this.filler.fillPre(this.options.items.pre, false);
                this.filler.fillPost(this.options.items.post, false);

                this.setupControls();

                $(window).on('orientationchange, resize', $.proxy(this.fit, this));

                this.$element.on('swipeleft', $.proxy(this.next, this));
                this.$element.on('swiperight', $.proxy(this.prev, this));

                if (this.options.pause === 'hover') {
                    this.$element
                        .on('mouseenter', $.proxy(this.pause, this))
                        .on('mouseleave', $.proxy(this.cycle, this));
                }

                if ($.browser.msie) {
                    if (parseInt($.browser.version) < 9) this.terribleBrowser = true;
                }
            };

            // RSlide prototype methods
            RSlide.prototype = {

                fit: function() {
//                    console.log('fitting');
                    this.filler.fitItems();
    //                console.log('offset', this.offset)
    //                console.log('adjust', this.offset % this.filler.itemWidth)
    //                console.log('to', this.offset + this.offset % this.filler.itemWidth);
    //                this.$container.css('margin-left', this.offset + this.offset % this.filler.itemWidth);
                    this.setOffsetByItems(this.offsetItems, 0);
                },

                setOffsetByItems: function(count, duration) {
                    this.offsetItems = count;
//                    console.log(this.offsetItems, this.filler.itemWidth);
                    this.setOffset(this.offsetItems * this.filler.itemWidth, duration);
                    return this;
                },

                adjustOffsetByItems: function(count, duration) {
                    this.setOffsetByItems(this.offsetItems + count, duration);
                    return this;
                },

                setOffset: function(px, duration) {
                    var self = this;
                    duration = typeof duration !== 'undefined' ? duration : this.options.slider.duration;
//                    console.log(px);
                    this.sliding = true;
                    this.$element.trigger('sliding');
                    this.offset = px;
                    if (!this.terribleBrowser) {
                        this.$container.transition({ x: -px }, duration, function() {
                            self.sliding = false;
                            self.$element.trigger('slid');
                        });
                    }
                    else {
                        this.$container.animate({ left: -px }, duration, function() {
                            self.sliding = false;
                            self.$element.trigger('slid');
                        });
                    }
                    return this;
                },

                prev: function(e) {
                    if (e) e.preventDefault();
                    if (this.sliding) return;
                    this.sliding = true;
                    this.adjustOffsetByItems(-this.options.slider.count);
                    this.filler.fillPre(this.options.slider.count, true);
                    return this;
                },
                next: function(e) {
                    if (e) e.preventDefault();
                    if (this.sliding) return;
                    this.sliding = true;
                    this.adjustOffsetByItems(this.options.slider.count);
                    this.filler.fillPost(this.options.slider.count, true);
                    return this;
                },

                add: function() {
                    this.filler.fillPost(5, false);
//                    console.log(this.$container.children())
                    return this;
                },

                setupControls: function() {
                    this.$element.find(this.options.controls.prev).on('click', $.proxy(this.prev, this));
                    this.$element.find(this.options.controls.next).on('click', $.proxy(this.next, this));
                    return this;
                }

            };

            $.fn.rslide = function (option) {
                return this.each(function() {
                    var $this = $(this),
                        data = $this.data('rslide'),
                        options = $.extend({}, $.fn.rslide.defaults, typeof option == 'object' && option),
                        action = typeof option == 'string' ? option : options.slide;
                    if (!data) $this.data('rslide', (data = new RSlide(this, options)));
                    if (typeof option == 'number') data.to(option);
                    else if (action) data[action]();
                    else if (options.interval) data.cycle();
                });
            };

            $.fn.rslide.defaults = {
                items: {
                    minWidth: 0,
                    maxWidth: '25%',
                    min: 2,
                    max: 4,
                    buffer: 1,
                    post: 1
                },
                container: {
                    width: undefined
                },
                slider: {
                    count: 1,
                    duration: 300
                },
                controls: {
                    next: '.next',
                    prev: '.prev'
                },
                pause: 'hover'
            };

            $.fn.rslide.Constructor = RSlide;

            function isUndefined(v) {
                return typeof v === 'undefined';
            }

            return $.fn.rslide;

        })(window.jQuery);
    }
);