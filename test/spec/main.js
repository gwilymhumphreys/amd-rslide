require.config({
  shim: {
  },

  paths: {
//    hm: 'vendor/hm',
//    esprima: 'vendor/esprima',
    app: '../scripts/app',
    jquery: '../scripts/vendor/jquery.min',
    jqueryTransit: '../scripts/vendor/jquery.transit.min',
    jqueryMobileEvents: '../scripts/vendor/jquery.mobile-events'
  }
});
 
require(['app/rslide', 'app/filler'], function(rslidePlugin, Filler) {

    $(document).ready(function() {

        var $ele = $('.whee'),
            rslide;
        $ele.rslide();
        rslide = $ele.data('rslide');

        describe('rslide', function() {


            it('should be available on jquery objects', function() {

                expect($.fn.rslide).to.exist;
                expect($ele.rslide).to.exist;
                expect(rslide).to.exist;

            });

            it('should create the right elements', function() {

                expect(rslide.$outer).to.exist;
                expect(rslide.$inner).to.exist;
                expect(rslide.$container).to.exist;
                expect(rslide.$items).to.exist;

            });
        });

        describe('filler', function() {

            var filler = rslide.filler;

            it('should have been instantiated by rslide', function() {

                expect(Filler).to.exist;
                expect(filler).to.exist;
                expect(filler.$outer).to.exist;
                expect(filler.$inner).to.exist;
                expect(filler.$container).to.exist;
                expect(filler.$items).to.exist;

            });

            it('parses width strings', function() {
                expect(filler.parseWidth(11)).to.equal(11);
                expect(filler.parseWidth('11px')).to.equal(11);
                expect(filler.parseWidth('11%', 100)).to.equal(11);
//                expect(filler.parseWidth('stupid string')).to.not.exist;
            });

            it('finds max item height', function() {
                expect(filler.getMaxItemHeight()).to.equal(198);
            });

            it('sets item css', function() {
                var $ele = $('<p></p>');
                $ele = filler.itemCss($ele, 1, 10, 1);
                expect($ele.css('width')).to.equal('10px');
                expect($ele.css('left')).to.equal('11px');
                expect($ele.css('position')).to.equal('absolute');
            });


            it('fills items correctly', function() {


            });
        });

        mocha.run()
    });

});