define([
       "jquery", "underscore", "backbone", "ufb"
      , "views/temp-snippet"
      , "helper/pubsub"
      , "text!templates/runtime/default.html"
      , "text!templates/runtime/modal-default.html"
      , "text!templates/runtime/modal-bottom-slide.html"
], function (
  $, _, Backbone, ufb
  , TempSnippetView
  , PubSub
  , _defaultTemplate
  , _modalTemplate
  , _modalBottomSlide
) {
    return Backbone.View.extend({
        tagName: "div"
      , initialize: function (options) {
          switch (options.formDisplayStyle) {

              case AppScope.FormDisplayStyles.NON_MODAL:
                  this.template = _.template(_defaultTemplate);
                  break;
              case AppScope.FormDisplayStyles.SLIDE_FROM_TOP:
                  this.template = _.template(_modalTemplate);
                  break;
              case AppScope.FormDisplayStyles.SLIDE_FROM_BOTTOM_RIGHT:
                  this.template = _.template(_modalBottomSlide);
                  ufb.init();
                  break;
              default:
                  this.template = _.template(_defaultTemplate);
                  break;
          }
          this.formName = this.options.formName;
          this.render();
      }
      , render: function () {
          //Render Snippet Views
          this.$el.empty();
          this.$el.html(this.template({formName: this.formName}));
          var that = this;
          _.each(this.collection.renderMyFormPreview(), function (snippet) {
              //that.$el.append(snippet);
              that.$('#renderFormInner').append(snippet);
          });
          this.$el.appendTo("#renderForm");
          this.delegateEvents();

      }
    })
});
