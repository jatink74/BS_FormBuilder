define([
       "jquery", "underscore", "backbone"
      , "views/temp-snippet"
      , "helper/pubsub", "helper/app-constants"
], function (
  $, _, Backbone
  , TempSnippetView
  , PubSub, AppConstants
) {
  return Backbone.View.extend({
    tagName: "div"
    , className: "form-div"
    , initialize: function (options) {
      this.collection.on("add", this.render, this);
      this.collection.on("remove", this.render, this);
      this.collection.on("change", this.render, this);
      PubSub.on("mySnippetDrag", this.handleSnippetDrag, this);
      PubSub.on("tempMove", this.handleTempMove, this);
      PubSub.on("tempDrop", this.handleTempDrop, this);
      this.$build = $("#build");

      this.formRecord = options.formRecord;
      this.displayClass = "default";
      switch (this.formRecord.get("formDisplayStyle")) {
          case AppConstants.FormDisplayStyles.NON_MODAL:
              this.displayClass = "default";
              break;
          case AppConstants.FormDisplayStyles.SLIDE_FROM_TOP:
              this.displayClass = "modal-default";
              break;
          case AppConstants.FormDisplayStyles.SLIDE_FROM_BOTTOM_RIGHT:
              this.displayClass = "modal-bottom-slide";
              break;
          default:
              break;
      }

      this.render();
    }
    , events: {
        "click #saveForm": "saveForm"
    }
    , render: function () {
      //Render Snippet Views
      this.$el.empty();
      this.$el.append("<button id='saveForm' type='button' class='btn btn-info'>Save Form</button>");
      var that = this;
      _.each(this.collection.renderAll(), function(snippet){
        that.$el.append(snippet);
      });
      this.$el.appendTo("#build form");
      this.$el.addClass(this.displayClass);
      /* @NOTE Jatin: The Rendered Tab now displays form instead of form code */
      $("#render").empty();
      _.each(this.collection.renderMyFormPreview(), function (snippet) {
          $("#render").append(snippet);
      });
      $("#render").addClass(this.displayClass);
      this.delegateEvents();
    }

    , getBottomAbove: function(eventY){
      var myFormBits = $(this.$el.find(".component"));
      var topelement = _.find(myFormBits, function(renderedSnippet) {
        if (($(renderedSnippet).position().top + $(renderedSnippet).height()) > eventY  - 90) {
          return true;
        }
        else {
          return false;
        }
      });
      if (topelement){
        return topelement;
      } else {
        return myFormBits[0];
      }
    }

    , handleSnippetDrag: function(mouseEvent, snippetModel) {
      $("body").append(new TempSnippetView({model: snippetModel}).render());
      this.collection.remove(snippetModel);
      PubSub.trigger("newTempPostRender", mouseEvent);
    }

    , handleTempMove: function(mouseEvent){
      $(".target").removeClass("target");
      if(mouseEvent.pageX >= this.$build.position().left &&
          mouseEvent.pageX < (this.$build.width() + this.$build.position().left) &&
          mouseEvent.pageY >= this.$build.position().top &&
          mouseEvent.pageY < (this.$build.height() + this.$build.position().top)){
        $(this.getBottomAbove(mouseEvent.pageY)).addClass("target");
      } else {
        $(".target").removeClass("target");
      }
    }

    , handleTempDrop: function(mouseEvent, model, index){
      if(mouseEvent.pageX >= this.$build.position().left &&
         mouseEvent.pageX < (this.$build.width() + this.$build.position().left) &&
         mouseEvent.pageY >= this.$build.position().top &&
         mouseEvent.pageY < (this.$build.height() + this.$build.position().top)) {
        var index = $(".target").index();
        $(".target").removeClass("target");
        this.collection.add(model,{at: index+1});
      } else {
        $(".target").removeClass("target");
      }
    }
      /* @NOTE Jatin: Ask the collection to save themselves. */
    , saveForm: function () {
        this.collection.saveAll();
    }
  })
});
