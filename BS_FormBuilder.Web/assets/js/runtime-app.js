define([
       "jquery", "underscore", "backbone"
       , "collections/snippets", "collections/my-form-snippets", "models/form-record"
       , "views/tab", "views/form-runtime"
], function (
  $, _, Backbone
  , SnippetsCollection, MyFormSnippetsCollection, FormRecord
  , TabView, FormRuntimeView
) {
    return {
        initialize: function (id) {
            var formRecord = new FormRecord({ formId: id });
            formRecord.fetch({
                success: function () {
                    var snippetsCollection = new MyFormSnippetsCollection(JSON.parse(formRecord.get("formBuilderJson")));
                    new FormRuntimeView({
                        title: "Original",
                        collection: snippetsCollection,
                        formRecord: formRecord,
                    });
                }
            });
        }
    }
});
