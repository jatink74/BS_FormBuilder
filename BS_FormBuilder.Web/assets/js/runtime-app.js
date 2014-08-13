define([
       "jquery", "underscore", "backbone"
       , "collections/snippets", "collections/my-form-snippets"
       , "views/tab", "views/form-runtime"
       , "text!data/input.json", "text!data/radio.json", "text!data/select.json", "text!data/buttons.json"
       , "text!templates/app/render.html", "text!templates/app/about.html"
       , "bootstrap-multiselect"
], function (
  $, _, Backbone
  , SnippetsCollection, MyFormSnippetsCollection
  , TabView, FormRuntimeView
  , inputJSON, radioJSON, selectJSON, buttonsJSON
  , renderTab, aboutTab
) {
    return {
        initialize: function () {

            var snippetsCollection = new MyFormSnippetsCollection(JSON.parse(formBuilderJson.replace(/&quot;/g, '"')));
            new FormRuntimeView({
                title: "Original"
              , collection: snippetsCollection
            });

        }
    }
});
