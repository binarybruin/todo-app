// define Task Model ItemView

define(function (require, exports, module) {

require('backbone/stickit');

var marionette = require('marionette');
var task_template = require('hbs!../templates/task-template');

var TaskView = marionette.ItemView.extend({
    template : task_template,
    initialize : function(){
    },
    ui : {
        input: "button .completed_button",
        span: ".task_text"
    },
    events : {
        // listen for button click
        "keypress .task_text" : "wantsSaveTask",
        "click .completed_button" : "wantsToggleCompleteTask",    // toggle completed
        "click .delete_button" : "wantsRemoveTask",
        "dblclick .task_text" : "wantsEditTask"

    },
    bindings : {
        ".status" : "status"
    },
    onShow: function() {
        this.stickit();
    },
    wantsToggleCompleteTask: function() {
        if (this.model.get("status") == "active")
        {
            this.model.set({status: "completed"});
            this.ui.input.value = "Activate";
            console.log(this.ui.input.value)
        }
        else {
            this.model.set({status: "active"});
            this.ui.input.text("Complete");
        }
    },
    wantsRemoveTask: function() {
        this.model.destroy()
    },
    wantsEditTask: function() {
        //console.log("edit")
        this.ui.span.attr("contenteditable", "true");
        //console.log(this.ui.span.text())
    },
    wantsSaveTask: function(event) {
        if (event.keyCode == 13) {
            //console.log("saved task")
            this.model.set({task_name: this.ui.span.text()})
            this.ui.span.attr("contenteditable", "false");
            //console.log(this.model.get("task_name"))
        }
    }
});

exports.TaskView = TaskView;

});
