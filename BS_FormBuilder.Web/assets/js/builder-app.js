define([
       "jquery" , "underscore" , "backbone"
       , "collections/snippets", "collections/my-form-snippets", "models/form-record"
       , "views/tab", "views/my-form-tabs"
       , "text!data/input.json", "text!data/radio.json", "text!data/select.json", "text!data/buttons.json"
       , "bootstrap-multiselect"
], function(
  $, _, Backbone
  , SnippetsCollection, MyFormSnippetsCollection, FormRecord
  , TabView, MyFormTabsView
  , inputJSON, radioJSON, selectJSON, buttonsJSON
){
    return {
        initialize: function (id) {

            //Bootstrap tabs from json.
            new TabView({
                title: "Input"
              , collection: new SnippetsCollection(JSON.parse(inputJSON))
            });
            new TabView({
                title: "Radios / Checkboxes"
              , collection: new SnippetsCollection(JSON.parse(radioJSON))
            });
            new TabView({
                title: "Select"
              , collection: new SnippetsCollection(JSON.parse(selectJSON))
            });
            new TabView({
                title: "Buttons"
              , collection: new SnippetsCollection(JSON.parse(buttonsJSON))
            });


            //Make the first tab active!
            $("#components .tab-pane").first().addClass("active");
            $("#formtabs li").first().addClass("active");

            // Bootstrap "My Form" with 'Form Name' snippet.
            var formRecord = new FormRecord({ formId: id });
            var snippetsCollection = 1;
            if (id == 0) {
                snippetsCollection = new MyFormSnippetsCollection([
                  {
                      "title": "Form Name",
                      "fields": {
                        "name": {
                            "label": "Form Name"
                          , "type": "input"
                          , "value": "Form Name"
                        }
                    }
                  }]);
                  renderForm();
            } else {
                formRecord.fetch({
                    success: function () {
                        snippetsCollection = new MyFormSnippetsCollection(JSON.parse(formRecord.get("formBuilderJson")));
                        renderForm();
                    }
                });
            }
            function renderForm() {
                new MyFormTabsView({
                    title: "DesignTimeTabs",
                    collection: snippetsCollection,
                    formRecord: formRecord,
                });
                //Make the first form builder designer/preview tab active!
                $("#target .tab-pane").first().addClass("active");
                $("#designformtabs li").first().addClass("active");
            }

            //$(document).ready(function () {

            //});

            $(document).ajaxStart(function () {
                $(".ajax-loader").show();
            });
            $(document).ajaxComplete(function () {
                $(".ajax-loader").hide();
            });
        }
    }
});
