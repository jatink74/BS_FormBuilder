define([
       'jquery', 'underscore', 'backbone'
      , "views/my-form", "views/my-form-preview"
      , "text!templates/app/my-form-tabs.html"

], function ($, _, Backbone,
             MyFormView, MyFormPreviewView,
             _myFormTabsTemplate)
{
    return Backbone.View.extend({
        tagName: "div"
      , initialize: function (options) {
          this.id = this.options.title.toLowerCase().replace(/\W/g, '');
          this.myFormTabsTemplate = _.template(_myFormTabsTemplate);

          this.formRecord = options.formRecord;

          this.render();
      }
      , events: {
          "click .save-form": "saveForm"
      }
      , render: function () {
          this.$el.html(this.myFormTabsTemplate());
          this.$el.appendTo(".my-form-container");
          this.myFormView = new MyFormView({
              title: "Form Design",
              collection: this.collection,
              formRecord: this.formRecord,
          });
          this.MyFormPreviewView = new MyFormPreviewView({
              title: "Form Preview",
              collection: this.collection,
              formRecord: this.formRecord,
          });
          this.delegateEvents();
      },
      saveForm: function () {
          this.myFormView.saveForm();
      }
    });
});
