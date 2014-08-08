define([
       "jquery", "underscore", "backbone"
      , "views/temp-snippet"
      , "helper/pubsub"
], function(
  $, _, Backbone
  , TempSnippetView
  , PubSub
) {
  return Backbone.View.extend({
    tagName: "fieldset"
    , initialize: function(){
      this.collection.on("add", this.render, this);
      this.collection.on("remove", this.render, this);
      this.collection.on("change", this.render, this);
      PubSub.on("mySnippetDrag", this.handleSnippetDrag, this);
      PubSub.on("tempMove", this.handleTempMove, this);
      PubSub.on("tempDrop", this.handleTempDrop, this);
      this.$build = $("#build");
      
      this.render();
    }

      /* @NOTE Jatin: Event for the "Save Form" button. */
    , events: {
        "click #saveForm": "saveForm"
    }
    , render: function () {
      //Render Snippet Views
      this.$el.empty();
      /* @NOTE Jatin: The "Save Form" button. */
      this.$el.append("<button id='saveForm' type='button' class='btn btn-info'>Save Form</button>");
      var that = this;
      _.each(this.collection.renderAll(), function(snippet){
        that.$el.append(snippet);
      });

      
      $("#render").empty();
      _.each(this.collection.renderMyFormPreview(), function (snippet) {
          $("#render").append(snippet);
      });

      //var previewHtml = _.map(that.collection.renderMyFormPreview(), function (snippet) {
      //    $("#render").html(previewHtml)
      //});
      //$("#render").html(previewHtml)
      //$("#render").html(
          
      //    _.each(that.collection.renderAll(), function (snippet) {
      //        return snippet;
      //    }));


        /*@Note Jatin: We need to render the form rather than showing the html */

      //$("#render").val(that.renderForm({
      //    text: _.map(this.collection.renderAllClean(), function (e) { return e.html() }).join("\n")
        //}));

      this.$el.appendTo("#build form");
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
