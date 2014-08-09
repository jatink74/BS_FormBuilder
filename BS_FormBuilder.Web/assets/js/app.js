define([
       "jquery" , "underscore" , "backbone"
       , "collections/snippets" , "collections/my-form-snippets"
       , "views/tab" , "views/my-form"
       , "text!data/input.json", "text!data/radio.json", "text!data/select.json", "text!data/buttons.json"
       , "text!templates/app/render.html", "text!templates/app/about.html"
       , "bootstrap-multiselect"
], function(
  $, _, Backbone
  , SnippetsCollection, MyFormSnippetsCollection
  , TabView, MyFormView
  , inputJSON, radioJSON, selectJSON, buttonsJSON
  , renderTab, aboutTab
){
  return {
      initialize: function(){

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
          new TabView({
              title: "Rendered"
            , content: renderTab
          });
          new TabView({
              title: "About"
            , content: aboutTab
          });


          //Make the first tab active!
          $("#components .tab-pane").first().addClass("active");
          $("#formtabs li").first().addClass("active");
          // Bootstrap "My Form" with 'Form Name' snippet.

          /*TODO Jatin: Implement this using Backbone Model style fetching*/
          //Note Jatin: Need to check if the mode is edit or create and populate if edit.
          var snippetsCollection;
          if (editMode == 'create') {
              snippetsCollection = new MyFormSnippetsCollection([
                {
                    "title": "Form Name"
                  , "fields": {
                      "name": {
                          "label": "Form Name"
                        , "type": "input"
                        , "value": "Form Name"
                      }
                  }
                }]);
          } else {
              snippetsCollection = new MyFormSnippetsCollection(JSON.parse(formBuilderJson.replace(/&quot;/g, '"')));
          }
          new MyFormView({
              title: "Original"
            , collection: snippetsCollection
          });


          $(document).ajaxStart(function () {
              $(".ajax-loader").show();
          });

          $(document).ajaxComplete(function () {
              $(".ajax-loader").hide();
          });

          $(document).ready(function () {
              $('.bs-multiselect').multiselect();
          });
      }
  }
});
