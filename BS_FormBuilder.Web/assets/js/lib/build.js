({
  name: "../main",
  out: "../main-built.js"
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
})
