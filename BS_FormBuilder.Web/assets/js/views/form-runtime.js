define([
       "jquery", "underscore", "backbone", "ufb"
      , "views/temp-snippet"
      , "helper/pubsub", "helper/app-constants"
      , "text!templates/runtime/default.html"
      , "text!templates/runtime/modal-default.html"
      , "text!templates/runtime/modal-bottom-slide.html"
], function (
  $, _, Backbone, ufb
  , TempSnippetView
  , PubSub , AppConstants
  , _defaultTemplate
  , _modalTemplate
  , _modalBottomSlide
) {
    return Backbone.View.extend({
        tagName: "div"
      , initialize: function (options) {
          this.formRecord = options.formRecord
          switch (this.formRecord.get("formDisplayStyle")) {
              case AppConstants.FormDisplayStyles.NON_MODAL:
                  this.template = _.template(_defaultTemplate);
                  break;
              case AppConstants.FormDisplayStyles.SLIDE_FROM_TOP:
                  this.template = _.template(_modalTemplate);
                  break;
              case AppConstants.FormDisplayStyles.SLIDE_FROM_BOTTOM_RIGHT:
                  this.template = _.template(_modalBottomSlide);
                  ufb.init();
                  break;
              default:
                  this.template = _.template(_defaultTemplate);
                  break;
          }
          this.formName = this.formRecord.get("formName");
          this.render();
      }
      , render: function () {
          //Render Snippet Views
          this.$el.empty();
          this.$el.html(this.template({formName: this.formName}));
          var that = this;
          _.each(this.collection.renderMyFormPreview(), function (snippet) {
              that.$('#renderFormInner').append(snippet);
          });
          this.$el.appendTo("#renderForm");
          this.delegateEvents();

      }
    })
});
