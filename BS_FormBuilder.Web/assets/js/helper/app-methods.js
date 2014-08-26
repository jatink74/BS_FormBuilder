define([
      'jquery', 'underscore', 'backbone',
      "helper/app-constants",
      "text!templates/runtime/default.html",
      "text!templates/runtime/modal-default.html",
      "text!templates/runtime/modal-bottom-slide.html"

], function ($, _, Backbone,
             AppConstants,
             _defaultTemplate,
             _modalTemplate,
             _modalBottomSlide
) {
    return {
        getRuntimeTemplate: function (formDisplayStyle) {
            var template;
            switch (formDisplayStyle) {
                case AppConstants.FormDisplayStyles.NON_MODAL:
                    template = _.template(_defaultTemplate);
                    break;
                case AppConstants.FormDisplayStyles.SLIDE_FROM_TOP:
                    template = _.template(_modalTemplate);
                    break;
                case AppConstants.FormDisplayStyles.SLIDE_FROM_BOTTOM_RIGHT:
                    template = _.template(_modalBottomSlide);
                    ufb.init();
                    break;
                default:
                    template = _.template(_defaultTemplate);
                    break;
            }
            return template;
        },

        getDisplayClass: function (formDisplayStyle) {
            var displayClass = "default";
            switch (formDisplayStyle) {
                case AppConstants.FormDisplayStyles.NON_MODAL:
                    displayClass = "default";
                    break;
                case AppConstants.FormDisplayStyles.SLIDE_FROM_TOP:
                    displayClass = "modal-default";
                    break;
                case AppConstants.FormDisplayStyles.SLIDE_FROM_BOTTOM_RIGHT:
                    displayClass = "modal-bottom-slide";
                    break;
                default:
                    break;
            }
            return displayClass;
        },

        getModalButtonPosClass: function (modalButtonPosition) {
            var positionClass = "bottom-right";
            switch (modalButtonPosition) {
                case AppConstants.ModalDialogButtonPosition.TOP_LEFT:
                    positionClass = "top-left";
                    break;
                case AppConstants.ModalDialogButtonPosition.TOP_RIGHT:
                    positionClass = "top-right";
                    break;
                case AppConstants.ModalDialogButtonPosition.BOTTOM_RIGHT:
                    positionClass = "bottom-right";
                    break;
                case AppConstants.ModalDialogButtonPosition.BOTTOM_LEFT:
                    positionClass = "bottom-left";
                    break;
                default:
                    break;
            }
            return positionClass;
        }
    }
})