// define Task Model ItemView

define(function (require, exports, module) {

require('backbone/stickit');

var marionette = require('marionette');
var task_template = require('hbs!../templates/task-template');

var TaskView = marionette.ItemView.extend({
    template : task_template,
    ui : {
        input: "button"
    },
    events : {
        // listen for button click
        "click .completed_button" : "wantsCompleteTask",
        "click .delete_button" : "wantsRemoveTask"

    },
    bindings : {
        ".status" : "status"
    },
    initialize : function(){

    },
    onShow: function() {
        this.stickit();
    },
    wantsCompleteTask: function(event) {
        this.model.set({status: "completed"})
    },
    wantsRemoveTask: function(event) {
        this.model.destroy()

    }
});

exports.TaskView = TaskView;

});
