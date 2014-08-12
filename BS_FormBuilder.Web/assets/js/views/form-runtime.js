define([
       "jquery", "underscore", "backbone"
      , "views/temp-snippet"
      , "helper/pubsub"
], function (
  $, _, Backbone
  , TempSnippetView
  , PubSub
) {
    return Backbone.View.extend({
        tagName: "fieldset"
      , initialize: function () {
          this.$build = $("#build");
          this.render();
      }
      , render: function () {
          //Render Snippet Views
          this.$el.empty();
          var that = this;
          _.each(this.collection.renderMyFormPreview(), function (snippet) {
              that.$el.append(snippet);
          });
          this.$el.appendTo("#build form");

          this.delegateEvents();
      }
    })
});
