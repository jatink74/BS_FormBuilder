define([
       'jquery', 'underscore', 'backbone'
      , "views/my-form", "views/my-form-preview"
      , "text!templates/app/my-form-tabs.html", "text!templates/app/export-form.html"
      , "bootstrap"

], function ($, _, Backbone,
             MyFormView, MyFormPreviewView,
             _myFormTabsTemplate, _exportFormTemplate)
{
    return Backbone.View.extend({
        tagName: "div"
      , initialize: function (options) {
          this.id = this.options.title.toLowerCase().replace(/\W/g, '');
          this.myFormTabsTemplate = _.template(_myFormTabsTemplate);
          this.exportFormTemplate = _.template(_exportFormTemplate);

          this.formRecord = options.formRecord;

          this.render();
      }
      , events: {
          "click .save-form": "saveForm",
          "click .export-form": "exportFormHtml"
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
          this.$el.append(this.exportFormTemplate({ formId: this.formRecord.id }));
          this.delegateEvents();
      },
      saveForm: function () {
          this.myFormView.saveForm();
      },
      exportFormHtml: function () {
          $("#exportFormModal").modal({ show: true });
      }
    });
});
