require.config({
  baseUrl: "/assets/js/lib/"
  , shim: {
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'underscore': {
      exports: '_'
    },
    'bootstrap-multiselect': {
        deps: ['bootstrap', 'jquery']
    },
    'bootstrap': {
      deps: ['jquery'],
      exports: '$.fn.popover'
    },
    'ufb': {
        deps: ['jquery'],
        exports: 'ufb'
    },
  }
  , paths: {
    app         : ".."
    , collections : "../collections"
    , data        : "../data"
    , models      : "../models"
    , helper      : "../helper"
    , templates   : "../templates"
    , views       : "../views"
  }
});

//require(['app/app'], function (app) {
//    //app.initialize();
//});

require(["jquery", "app/builder-app", "app/runtime-app"], function ($) {
    startModuleName = $("script[data-main][data-start]").attr("data-start");
    formId = $("script[data-main][data-start]").attr("data-form-id");
    if (startModuleName) {
        require([startModuleName], function (startModule) {
            $(function () {
                var fn = $.isFunction(startModule) ? startModule : startModule.initialize;
                if (fn) { fn(formId); }
            });
        });
    }
});
