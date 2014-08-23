define([
       "jquery", "underscore", "backbone"
      , "bootstrap"
      , "bootstrap-multiselect"

], function ($, _, Backbone
) {
    return {
        initialize: function (el, model) {
            var inputSize = model.getValues()["inputsize"];
            var bsMultiSelect = $('.bs-multiselect', el);
            if (bsMultiSelect) {
                bsMultiSelect.multiselect({
                    buttonClass: 'btn ' + inputSize,
                });
            }
        }
    };
});