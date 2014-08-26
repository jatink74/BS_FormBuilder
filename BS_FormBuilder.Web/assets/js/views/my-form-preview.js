define([
       "jquery", "underscore", "backbone"
       , "text!templates/app/tab-nav.html"
      , "helper/pubsub", "helper/app-constants", "helper/app-methods"
], function (
  $, _, Backbone
  , _tabNavTemplate
  , PubSub, AppConstants, AppMethods
) {
    return Backbone.View.extend({
    tagName: "div"
    , className: "tab-pane preview"
    , initialize: function (options) {
        this.title = this.options.title;
        this.id = this.options.title.toLowerCase().replace(/\W/g, '');
        this.tabNavTemplate = _.template(_tabNavTemplate);
        this.collection.on("add", this.renderFormCollection, this);
        this.collection.on("remove", this.renderFormCollection, this);
        this.collection.on("change", this.renderFormCollection, this);
        this.formRecord = options.formRecord;
        this.displayClass = AppMethods.getDisplayClass(this.formRecord.get("formDisplayStyle"));
        //switch (this.formRecord.get("formDisplayStyle")) {
        //    case AppConstants.FormDisplayStyles.NON_MODAL:
        //        this.displayClass = "default";
        //        break;
        //    case AppConstants.FormDisplayStyles.SLIDE_FROM_TOP:
        //        this.displayClass = "modal-default";
        //        break;
        //    case AppConstants.FormDisplayStyles.SLIDE_FROM_BOTTOM_RIGHT:
        //        this.displayClass = "modal-bottom-slide";
        //        break;
        //    default:
        //        break;
        //}
        this.render();
    }
    , render: function () {
        this.renderFormCollection();
        this.renderFormTab();
    }

    , renderFormCollection: function () {
        this.$el.empty();
        var that = this;
        _.each(this.collection.renderMyFormPreview(), function (snippet) {
            that.$el.append(snippet);
        });
        this.delegateEvents();
    }
    , renderFormTab: function () {
        // Render & append nav for tab
        $("#designformtabs").append(this.tabNavTemplate({ title: this.title, id: this.id }));

        this.$el.attr("id", this.id);
        this.$el.appendTo(".form-builder-tab .tab-content");
        this.$el.addClass(this.displayClass);
    }
    });
});
