define([
      'jquery', 'underscore', 'backbone'
], function ($, _, Backbone) {
    return Backbone.Model.extend({

        idAttribute: 'formId',

        urlRoot: function () {
            return '/FormRuntime/RunData/';
        },

        initialize: function () {
        }
    });
});
