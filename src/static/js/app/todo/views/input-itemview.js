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
        "keypress input" : "wantsCreateTask",
        "click .clear_completed_button" : "wantsRemoveCompleted"
    },

    wantsCreateTask: function(event) {
        if (event.keyCode == 13) {
            //only create task if it is not empty
            if (!(this.ui.input.val()==""))
                this.createTask();

            // reset input field after creating task
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
    },

    wantsRemoveCompleted: function() {
        // get completed tasks
        var completed_tasks = this.collection.where({status: "completed"});

        // remove completed
        this.collection.remove(completed_tasks);

        // destroy completed
        completed_tasks.forEach(function(completed_task) {
            completed_task.destroy()
        });
    }
});

exports.InputView = InputView;

});
