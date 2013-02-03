require.config({
  shim: {
  },

  paths: {
//    hm: 'vendor/hm',
//    esprima: 'vendor/esprima',
    jquery: 'empty:',
    jqueryTransit: 'vendor/jquery.transit.min',
    jqueryMobileEvents: 'vendor/jquery.mobile-events'
  }
});
 
require(['app/app'], function(app) {

    $('.rslide').rslide();
});