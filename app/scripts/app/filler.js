define(['jqueryTransit'],

    function() {

        return (function($) {

            // Filler
            var Filler = function(outer, inner, container, items, options) {

                this.$outer = outer;
                this.$inner = inner;
                this.$container = container;
                this.$items = items;
                this.options = options;

                this.containerWidth = this.options.container.width || this.$inner.width();
                this.calcWidths(this.containerWidth);

                this.preIndex = -1;
                this.postIndex = 0;

                this.fillPre(this.options.items.buffer, false);
                this.fillPost(this.options.items.buffer, false);

                this.itemWidth = 0;
            };

            // Filler prototype methods
            Filler.prototype = {

                // Fill in a number of objects to either side of the current ones
                fillPre: function(count, remove) {
                    var self = this,
                        toPrepend = this.getItems(this.$items, this.preIndex , count),
                        startPoint = this.$container.children().first().position().left;
                    [].reverse.call(toPrepend).each(function(i, item) {
                        self.$container.prepend(self.itemCss(item, startPoint, self.itemWidth, -(i+1)));
                    });
                    this.adjustPreIndex(count);
                    if (remove) {
                        this.removePost(count);
                    }
                    return this;
                },

                fillPost: function(count, remove) {
                    var self = this,
                        toAppend = this.getItems(this.$items, this.postIndex, count),
                        startPoint = this.$container.children().last().position().left;
                    toAppend.each(function(i, item) {
                        self.$container.append(self.itemCss(item, startPoint, self.itemWidth, i+1));
                    });
                    this.adjustPostIndex(count);
                    if (remove) {
                        this.removePre(count);
                    }
                    return this;
                },

                removePre: function(count) {
                    var $items = this.$container.children();
                    $items.slice(0, count).remove();
                    this.adjustPreIndex(-count);
                    return this;
                },
                removePost: function(count) {
                    var $items = this.$container.children();
                    $items.slice(-count).remove();
                    this.adjustPostIndex(-count);
                    return this;
                },

                // Increase pre / post index by count
                adjustPreIndex: function(count) {
                    this.preIndex = (this.preIndex - count) % this.$items.length;
                    return this;
                },
                adjustPostIndex: function(count) {
                    this.postIndex = (this.postIndex + count) % this.$items.length;
                    return this;
                },

                // calc item width and count and apply
                fitItems: function() {
                    var self = this,
                        currentWidth = this.$inner.width(),
                        maxHeight = 0;

                    this.itemCount = this.calcItemCount(currentWidth, this.maxWidth);
                    this.itemWidth = this.calcItemWidth(currentWidth, this.itemCount);

                    this.$container.children().each(function(i, item) {
                        var h = $(item).css({
                            width: self.itemWidth + 'px',
                            left: (i-self.options.items.buffer)*self.itemWidth + 'px'
                        }).height();
                        maxHeight = h > maxHeight ? h : maxHeight;
                    });

                    this.$container.height(maxHeight);
                    return this;
                },

                // Set container, min and max widths
                calcWidths: function(containerWidth) {
                    // Calc min max widths before fitting items
                    this.maxWidth = this.parseUnits(this.options.items.maxWidth, containerWidth) ||
                        this.getMax(this.$items, 'width');
                    this.minWidth = this.parseUnits(this.options.items.minWidth, containerWidth) ||
                        this.maxWidth / 2;
                    return this;
                },

                //todo: min widths
                calcItemCount: function(containerWidth, itemWidth) {
                    return Math.ceil(containerWidth / itemWidth);
                },

                calcItemWidth: function(containerWidth, count) {
                    return containerWidth / count;
                },

                getMax: function(items, fn) {
                    var max = -Infinity;
                    items.each(function(i, item) {
                        var m = fn ? $(item)[fn]() : item;
                        if (m > max) {
                            max = m;
                        }
                    });
                    return max;
                },

                parseUnits: function(width, containerWidth) {

                    if (typeof width == 'string') {
                        if (width.charAt(width.length - 1) == '%') {
                            return containerWidth *  (width.slice(0, width.length - 1)/100);
                        }
                        else {
                            if (width.slice(-2, width.length) !== 'px') {
                                if (console) console.log('rslide: options.items.(max|min)Width must either be undefined, a number, or end with `%` or `px`. You provided: ', width, '('+typeof width+')');
                            }
                            return parseFloat(width);
                        }
                    }

                    else if (typeof width == 'number') {
                        return width;
                    }

                    return undefined;
                },

                itemCss: function(item, start, width, count) {
                    var offset = (start + count*width) + 'px',
                        $item = $(item).css({
                            width: width + 'px',
                            position: 'absolute',
                            left: offset
                        });
                    return $item;
                },

                // Get a number of items from source array / jQuery object
                // If the starting `index` is negative will operate in reverse from the end of the source
                // Items will always be returned in the order they appear in source
                // Repeats objects to make up `count` items
                getItems: function(source, index, count) {
                    var items, end,
                        wrapIndex = 0,
                        wrap = 0;

                    source = source.clone ? source.clone() : source;

                    if (index < 0) {
                        index = (source.length + index) % source.length;
                    }
                    end = index + count;
                    wrap = end - source.length;
                    items = source.slice(index, end);

                    if (wrap > 0) {
                        var wrapped = this.getItems(source, wrapIndex, wrap);
                        $.merge(items, wrapped);
                    }

                    return items;
                }

            };

            return Filler;

        })(window.jQuery);
    }
);
