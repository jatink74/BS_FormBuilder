define([
       "jquery", "underscore", "backbone"
       , "models/snippet"
       , "views/snippet", 
], function (
  $, _, Backbone
  , SnippetModel
  , SnippetView
) {
    return SnippetView.extend({
        events: {
            "click": "preventDefaultAction" //stop file button reacting
        }
      , preventDefaultAction: function (clickEvent) { //required to prevent triggering for elements like type=file
          var targetType = $(clickEvent.target).attr('type');
          if (targetType && targetType.toLowerCase() == "file") {
              clickEvent.preventDefault();
              clickEvent.stopPropagation();
          }
      }
    });
});
