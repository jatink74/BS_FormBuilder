define([
       "jquery" , "underscore" , "backbone"
       , "models/snippet"
       , "collections/snippets" 
       , "views/my-form-snippet"
], function(
  $, _, Backbone
  , SnippetModel
  , SnippetsCollection
  , MyFormSnippetView
){
  return SnippetsCollection.extend({
    model: SnippetModel
    , renderAll: function(){
      return this.map(function(snippet){
        return new MyFormSnippetView({model: snippet}).render(true);
      })
    }
    , renderAllClean: function(){
      return this.map(function(snippet){
        return new MyFormSnippetView({model: snippet}).render(false);
      });
    }
    /* @NOTE Jatin: Need a way for form snippets collection to save themselves. */
    , saveAll: function () {
        var payload = [];
        this.each(function (model) {
            payload.push(model.getValues());
        });

        // TODO Jatin: Implement backbone style routing
        var formName = payload[0]["name"];
        var formJson = JSON.stringify(payload);
        var formBuilderJson = JSON.stringify(this);
        //console.clear();
        //console.log(formJson);
        //console.log(formBuilderJson);
        $.ajax({
            type: "POST",
            url: url,
            data: AddAntiForgeryToken({ formId: formId, formName: formName, formJson: formJson, formBuilderJson: formBuilderJson }),
            success: function (resp) {
                $(".ajax-loader").hide();
                if (resp.result == 'Redirect') {
                    window.location.href = resp.url;
                } else {
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
