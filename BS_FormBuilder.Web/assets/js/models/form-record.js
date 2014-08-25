define([
      'jquery', 'underscore', 'backbone'
], function ($, _, Backbone) {
    return Backbone.Model.extend({
        idAttribute: 'formId',
        urlRoot: '/FormRuntime/RunData/',
        url: function () {
            var url;
            if (this.get("guid") == '') {
                return url = this.urlRoot + this.id;
            }
            else {
                return url = this.urlRoot + this.get("guid")
            }
            return ;
        },
        defaults: {
            formId: 0,
            formName: '',
            formJson: [],
            formBuilderJson: [],
            createdOn: '',
            updatedOn: '',
            rowVersion: '',
            formDisplayStyle: '',
            guid:''
        },

        initialize: function () {
        }
    });
});
