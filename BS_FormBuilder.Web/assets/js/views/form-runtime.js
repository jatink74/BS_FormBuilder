define([
       "jquery", "underscore", "backbone", "ufb"
      , "views/temp-snippet"
      , "helper/pubsub", "helper/app-constants", "helper/app-methods"
], function (
  $, _, Backbone, ufb
  , TempSnippetView
  , PubSub , AppConstants, AppMethods
) {
    return Backbone.View.extend({
        tagName: "div"
      , initialize: function (options) {
          this.formRecord = options.formRecord;
          this.template = AppMethods.getRuntimeTemplate(this.formRecord.get("formDisplayStyle"));
          this.positionClass = AppMethods.getModalButtonPosClass(this.formRecord.get("openDialogBtnPosition"));
          this.formName = this.formRecord.get("formName");
          this.buttonStyle = AppMethods.getModalButtonStyle(this.formRecord.get("openDialogBtnBackground"),
                                                            this.formRecord.get("openDialogBtnForeground"),
                                                            this.formRecord.get("openDialogBtnFont"),
                                                            this.formRecord.get("openDialogBtnFontSize"));
          this.render();
      }
      , render: function () {
          //Render Snippet Views
          this.$el.empty();
          this.$el.html(this.template({
              guid: this.formRecord.get("guid"),
              formName: this.formName,
              buttonStyle: this.buttonStyle,
              postionClass: this.positionClass
          }));
          var that = this;
          _.each(this.collection.renderMyFormPreview(), function (snippet) {
              that.$('#renderFormInner').append(snippet);
          });
          this.$el.appendTo("#renderForm");
          this.delegateEvents();
      }
    })
});
