define(['app/filler', 'jqueryMobileEvents'],

    function(Filler) {

        return (function($) {

            // rslide class
            var RSlide = function(element, options) {

                this.options = options;
                this.initElements(element);
                this.initControls();
                this.offset = 0;
                this.offsetItems = 0;
                this.filler = new Filler(this.$outer, this.$inner, this.$container, this.$items, this.options);

                $(window).on('orientationchange, resize', $.proxy(this.onResize, this));

                if (this.options.pause === 'hover') {
                    this.$outer
                        .on('mouseenter', $.proxy(this.pause, this))
                        .on('mouseleave', $.proxy(this.cycle, this));
                }

                if ($.browser.msie) {
                    if (parseInt($.browser.version) < 9) this.terribleBrowser = true;
                }

                this.startOnImagesReady();
            };

            // RSlide prototype methods
            RSlide.prototype = {

                startOnImagesReady: function() {
                    var loading,
                        $images = $('img', this.$container);

                    // Trigger fitting when all images are loaded
                    $images.load($.proxy(this.fit, this));

                    // Check if images are loaded already and fit immediately if so
                    $images.each(function(i, img) {
                        if (!img.complete) {
                            loading = true;
                            return false;
                        }
                    });
                    !loading && this.fit();
                },

                fit: function() {
                    this.filler.fitItems();
                    this.setOffsetByItems(this.offsetItems, 0);
                },

                // Increase our offset by count items
                adjustOffsetByItems: function(count, duration) {
                    this.setOffsetByItems(this.offsetItems + count, duration);
                    return this;
                },

                // Set our offset to count items
                setOffsetByItems: function(count, duration) {
                    this.offsetItems = count;
                    this.setOffset(this.offsetItems * this.filler.itemWidth, duration);
                    return this;
                },

                setOffset: function(px, duration) {
                    var self = this;
                    duration = typeof duration !== 'undefined' ? duration : this.options.slider.duration;
                    this.sliding = true;
                    this.$outer.trigger('sliding');
                    this.offset = px;
                    if (!this.terribleBrowser) {
                        this.$container.transition({ x: -px }, duration, function() {
                            self.sliding = false;
                            self.$container.trigger('slid');
                        });
                    }
                    else {
                        this.$container.animate({ left: -px }, duration, function() {
                            self.sliding = false;
                            self.$container.trigger('slid');
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

                onResize: function(e) {
                    this.setOffsetByItems(0, 0);
                    this.fit();
                },

                initElements: function(ele) {
                    this.$container = $(ele).wrap('<div class="rslide-inner"></div>').css({
                        padding: 0,
                        width: '99999px',
                        margin: '0 auto',
                        position: 'relative'
                    });
                    this.$inner = this.$container.parent().css({
                        position: 'relative', // ie7 :|
                        overflow: 'hidden'
                    });
                    this.$inner.wrap('<div class="rslide-outer"></div>');
                    this.$outer = this.$inner.parent().css({
                        position: 'relative'
                    });
                    this.$items = this.$container.children().css({
                        'list-style': 'none',
                        position: 'absolute'
                    });
                    if (this.options.items.fitImages) {
                        this.$items.find(this.options.items.imageSelector).css({
                            width: '100%',
                            height: 'auto'
                        });
                    }
                },

                initControls: function() {

                    if (this.options.controls.create) {
                        this.$next = $('<a href="" class="next"></a>').appendTo(this.$outer);
                        this.$prev = $('<a href="" class="prev"></a>').appendTo(this.$outer);
                    }
                    else {
                        this.$next = $(this.options.controls.next);
                        this.$prev = $(this.options.controls.prev);
                    }

                    this.$prev.on('click', $.proxy(this.prev, this));
                    this.$next.on('click', $.proxy(this.next, this));

                    this.$outer.on('swipeleft', $.proxy(this.next, this));
                    this.$outer.on('swiperight', $.proxy(this.prev, this));

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
                    minWidth: undefined,
                    maxWidth: '25%',
                    min: 2,
                    max: 4,
                    buffer: 1,
                    fitImages: true,
                    imageSelector: 'img'
                },
                container: {
                    width: undefined
                },
                slider: {
                    count: 1,
                    duration: 300
                },
                controls: {
                    next: '',
                    prev: '',
                    create: true
                },
                pause: 'hover'
            };

            $.fn.rslide.Constructor = RSlide;

            return $.fn.rslide;

        })(window.jQuery);
    }
);