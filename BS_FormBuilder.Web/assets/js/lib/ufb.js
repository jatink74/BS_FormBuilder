var UFB_FEEDBACK_ENDPOINT = '/ubiquitous-feedback';

window.ufb = {

    settings: {},

    init: function(settings){

        ufb.settings.path = "/"; //assets

        var _init = function(settings){

            //allow settings to be a string only for feedbackEndpoint
            if(typeof(settings)=="string"){
                ufb.settings.feedbackEndpoint = settings;
            }else{
                for (var k in settings) {
                    ufb.settings[k] = settings[k];
                }
            }

        }
        window.$ufb = jQuery.noConflict();
        _init(settings);
    },

    toggleFeedback:
        function (){
            var $feedbackMain = $ufb('#ufb-main');

            if($feedbackMain.css('height')=='33px'){
                $feedbackMain.css('height', '300px');
                $ufb('#ufb-message-textarea').focus();
                $ufb('#ufb-icon').attr('src', ufb.settings.path + 'assets/img/runtime/inline-feedback-minus.png');
            }else{
                $feedbackMain.css('height', '33px');
                $ufb('#ufb-icon').attr('src', ufb.settings.path + 'assets/img/runtime/inline-feedback-plus.png');
            }
        },

    sendFeedback: function(){
        var message = $ufb('#ufb-message-textarea').val(),
            email = $ufb('#ufb-email-input').val(),
            location = window.location.href;

        $ufb.ajax(
            {
                url: ufb.settings.feedbackEndpoint,
                type: "POST",
                data: {
                    message: message,
                    email: email,
                    location: location
                },
                complete: function(){
                    /*
                    no action taken regardless of result, add debug code here if you
                    aren't seeing feedback messages come through.
                     */
                }
            }
        );
        $ufb('#ufb-message-textarea').val('');
        $ufb('#ufb-email-input').val('');
        $ufb('#ufb-body').css("display", "none");
        $ufb('#ufb-body-thanks-container').css("display", "block");
        setTimeout(
            function(){
                ufb.toggleFeedback();
                setTimeout(
                    function(){
                        $ufb('#ufb-body').css("display", "block");
                        $ufb('#ufb-body-thanks').css("display", "none");
                    },
                    1000
                )
            },
            2000
        )
    },

    /*
    Helper functions that would normally be replaced by jQuery functionality,
    but that we may need access to before a jQuery object is available.
     */
    helpers: {
        addStyle: function(str, hoo, med){
            var el= document.createElement('style');
            el.type= "text/css";
            el.media= med || 'screen';
            if(hoo) el.title= hoo;
            if(el.styleSheet) el.styleSheet.cssText= str;//IE only
            else el.appendChild(document.createTextNode(str));
            return document.getElementsByTagName('head')[0].appendChild(el);
        }
    }
}
