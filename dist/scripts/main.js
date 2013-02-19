require.config({
  shim: {
  },

  paths: {
    jquery: 'empty:',
    jqueryTransit: 'vendor/jquery.transit.min',
    jqueryMobileEvents: 'vendor/jquery.mobile-events'
  }
});
 
require(['app/rslide'], function(rslide) {

    $(document).ready(function() {
        $('.whee').rslide();
    });

});