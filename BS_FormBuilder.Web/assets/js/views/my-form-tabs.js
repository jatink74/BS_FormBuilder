define([
       'jquery', 'underscore', 'backbone'
      , "views/my-form", "views/my-form-preview"

], function ($, _, Backbone,
             MyFormView, MyFormPreviewView)
{
    return Backbone.View.extend({
        tagName: "div"
      , className: "tab-pane-test"
      , initialize: function (options) {
          this.id = this.options.title.toLowerCase().replace(/\W/g, '');
          //this.tabNavTemplate = _.template(_tabNavTemplate);

          this.formRecord = options.formRecord;

          this.render();
      }
      , render: function () {
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
      }
    });
});
