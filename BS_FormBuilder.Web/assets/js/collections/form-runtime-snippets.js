define([
       "jquery", "underscore", "backbone"
       , "models/snippet"
       , "collections/snippets"
       , "views/form-runtime-snippet"
], function (
  $, _, Backbone
  , SnippetModel
  , SnippetsCollection
  , FormRuntimeSnippetView
) {
    return SnippetsCollection.extend({
        model: SnippetModel
      , renderAll: function () {
          return this.map(function (snippet) {
              return new FormRuntimeSnippetView({ model: snippet }).render(false);
          })
      }
    });
});
