define([
       "jquery" , "underscore" , "backbone"
       , "models/snippet"
       , "collections/snippets" 
       , "views/my-form-snippet"
       , "views/my-form-preview-snippet"
], function (
  $, _, Backbone
  , SnippetModel
  , SnippetsCollection
  , MyFormSnippetView
  , MyFormPreviewSnippetView
) {
    return SnippetsCollection.extend({
        model: SnippetModel
      , renderAll: function () {
          return this.map(function (snippet) {
              return new MyFormSnippetView({ model: snippet }).render(true);
          })
      }
      , renderAllClean: function () {
          return this.map(function (snippet) {
              return new MyFormSnippetView({ model: snippet }).render(false);
          });
      }
      /*@NOTE Jatin: Separate out Preview Functionality */
      , renderMyFormPreview: function () {
          return this.map(function (snippet) {
              return new MyFormPreviewSnippetView({ model: snippet }).render(false);
          });
      }
  
      /* @NOTE Jatin: Need a way for form snippets collection to save themselves. */
      , saveAll: function () {
          var payload = [];
          this.each(function (model) {
              payload.push(model.getValues());
          });

          // TODO Jatin: Implement backbone api calls instead 
          var formName = payload[0]["name"];
          var formJson = JSON.stringify(payload);
          var formBuilderJson = JSON.stringify(this);
          $.ajax({
              type: "POST",
              url: AppScope.url,
              data: AppScope.AddAntiForgeryToken({
                  formId: AppScope.formId,
                  formName: formName,
                  formJson: formJson,
                  formBuilderJson: formBuilderJson
              }),
              success: function (resp) {
                  console.log(resp.errorMessage);
                  $(".ajax-loader").hide();
                  if (resp.result == 'Redirect') {
                      window.location.href = resp.url;
                  }
                  else if (resp.result == 'Error') {
                      alert(resp.errorMessage);
                  }
                  else {
                      alert("Form has been successfully updated.");
                  }
              },
              error: function () {
                  alert("Error Saving Form");
              }
          });
          return;
      }
    });
});
