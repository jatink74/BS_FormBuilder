define([
  "jquery", "underscore", "backbone"
  , "text!templates/popover/popover-main.html"
  , "text!templates/popover/popover-input.html"
  , "text!templates/popover/popover-select.html"
  , "text!templates/popover/popover-textarea.html"
  , "text!templates/popover/popover-textarea-split.html"
  , "text!templates/popover/popover-checkbox.html"
  , "templates/snippet/snippet-templates"
  , "helper/bs-multiselect"
  , "bootstrap"
  , "bootstrap-multiselect"
], function (
  $, _, Backbone
  , _PopoverMain
  , _PopoverInput
  , _PopoverSelect
  , _PopoverTextArea
  , _PopoverTextAreaSplit
  , _PopoverCheckbox
  , _snippetTemplates
  , BootstrapMultiselect
) {
    return Backbone.View.extend({
        tagName: "div"
      , className: "component"
      , initialize: function () {
          this.template = _.template(_snippetTemplates[this.model.idFriendlyTitle()])
          this.popoverTemplates = {
              "input": _.template(_PopoverInput)
            , "select": _.template(_PopoverSelect)
            , "textarea": _.template(_PopoverTextArea)
            , "textarea-split": _.template(_PopoverTextAreaSplit)
            , "checkbox": _.template(_PopoverCheckbox)
          }
      }
      , render: function (withAttributes) {
          var that = this;
          var returnHtml;
          var content = _.template(_PopoverMain)({
              "title": that.model.get("title"),
              "items": that.model.get("fields"),
              "popoverTemplates": that.popoverTemplates
          });
          if (withAttributes) {
              returnHtml = this.$el.html(that.template(that.model.getValues())).attr({
                  "data-content": content
                , "data-title": that.model.get("title")
                , "data-trigger": "manual"
                , "data-html": true
              });
          } else {
              returnHtml = this.$el.html(that.template(that.model.getValues()))
          }
          BootstrapMultiselect.initialize(this.$el, this.model);
          return returnHtml
      }
    });
});
