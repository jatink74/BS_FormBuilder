define([
      'jquery', 'underscore', 'backbone'
], function ($, _, Backbone) {
    return Backbone.Model.extend({
        idAttribute: 'formId',
        urlRoot: function () {
            return '/FormRuntime/RunData/';
        },
        defaults: {
            formId: 0,
            formName: '',
            formJson: [],
            formBuilderJson: [],
            createdOn: '',
            updatedOn: '',
            rowVersion: '',
            formDisplayStyle: ''
        },

        initialize: function () {
        }
    });
});
