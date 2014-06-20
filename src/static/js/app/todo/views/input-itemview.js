define(function (require, exports, module) {

var marionette = require('marionette');
var input_template = require('hbs!../templates/input-template');
var Task                = require('app/todo/models/task-model').Task;

var InputView = marionette.ItemView.extend({
    template : input_template,
    ui : {
        input: "input"
    },

    events : {
        // listen for keypress
        "keypress" : "wantsCreateTask"
    },

    /*edit: function() {
      //this.$el.addClass("editing");
      this.input.focus();
    },*/

    wantsCreateTask: function(event) {
        if (event.keyCode == 13) {
            this.createTask();

            // reset input field
            this.ui.input.val("");
        }
    },

    initialize : function(options){
        this.collection = options.collection

    },

    createTask: function(){
        // create an empty task
        var new_task = new Task();

        // set task value
        new_task.set({status: "active", task_name: this.ui.input.val()})
        this.collection.add(new_task)
    }
});

exports.InputView = InputView;

});
