define(['jqueryTransit'],

    function() {

        return (function($) {

            // Filler
            var Filler = function(ele, container, items, options) {

                this.$element = ele;
                this.$container = container;
                this.$items = items;
                this.options = options;

                this.preIndex = -1;
                this.postIndex = 0;

                this.options.items.pre = this.options.items.pre === 0 ? 0 : this.options.items.pre || this.itemCount;
                this.options.items.post = this.options.items.post === 0 ? 0 : this.options.items.post || this.itemCount;

                this.itemWidth = 0;
            };

            // Filler prototype methods
            Filler.prototype = {

                itemCss: function(item, start, width, count) {
                    var offset = (start + count*width) + 'px',
                        $item = $(item).css({
                            width: width + 'px',
                            position: 'absolute',
                            left: offset
                        });
                    return $item;
                },

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
                    $items.slice(-count, -1).remove();
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
                    var self = this;

                    this.calcWidths();

                    this.itemCount = this.calcItemCount(this.containerWidth);
                    this.itemWidth = this.calcItemWidth(this.containerWidth, this.itemCount);

                    this.$items = this.$container.children();
                    this.$items.each(function(i, item) {
                        $(item).css({
                            width: self.itemWidth + 'px',
                            position: 'absolute',
                            left: i*self.itemWidth + 'px'
                        });
                    });

                    this.$container.height(this.getMaxItemHeight());

                    return this;
                },

                calcWidths: function() {
                    this.containerWidth = this.options.container.width || this.$element.find('> .inner').width();

                    // Calc min max widths before fitting items
                    this.options.items.maxWidth = this.calcMaxItemWidth(this.containerWidth);
//                    console.log(this.options.items.maxWidth);

                    if (typeof this.options.items.minWidth === 'undefined') {
                        this.options.items.minWidth = this.options.items.maxWidth / 2;
                    }

                },

                calcItemCount: function(containerWidth) {
                    return Math.ceil(containerWidth / this.options.items.maxWidth);
                },

                calcItemWidth: function(containerWidth, count) {
                    return containerWidth / count;
                },

                // todo: check css for these props?
                calcMaxItemWidth: function(containerWidth) {

                    var maxWidth = this.parseWidth(this.options.items.maxWidth, containerWidth);

                    if (!maxWidth) {
                        var min = Infinity;
                        maxWidth = 0;
                        this.$items.each(function(i, item) {
                            var width = $(item).width();
                            if (width < min) {
                                min = width;
                            }
                            if (width > maxWidth) {
                                maxWidth = width;
                            }
                        });
                    }
                    return maxWidth;
                },

                parseWidth: function(width, containerWidth) {

                    if (typeof width == 'number') {
                        return width;
                    }

                    else if (typeof width == 'string') {
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

                    return width;
                },

                // todo: consolidate
                getMaxItemHeight: function() {
                    var min = Infinity,
                        max = 0;
                    this.$items.each(function(i, item) {
                        var width = $(item).height();
                        if (width < min) {
                            min = width;
                        }
                        if (width > max) {
                            max = width;
                        }
                    });
                    return max;
                },

                // Get a number of items from source array / jQuery object
                // If `index` is negative will operate in reverse from the end of the source
                // Repeats objects to make up `count` items
                getItems: function(source, index, count) {
                    source = source.clone();
                    var items, end,
                        wrapIndex = 0,
                        wrap = 0;

                    if (index < 0) {
                        end = source.length + index + 1;
                        index = end - count;
                        if (index < 0) {
                            wrap = -index;
                            index = 0;
                            wrapIndex = -1;
                        }
                    }
                    else {
                        end = index + count;
                        wrap = end - source.length;
                    }

                    items = source.slice(index, end).clone();

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
