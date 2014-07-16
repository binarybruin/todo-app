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
        input: "button",
        checkbox: ".toggle_complete",
        span: ".task_text"
    },
    events : {
        // listen for button click
        "keypress .task_text" : "wantsSaveTask",
        "click .toggle_complete" : "wantsToggleCompleteTask",    // toggle completed
        "click .delete_button" : "wantsRemoveTask",
        "dblclick .task_text" : "wantsEditTask"

    },
    bindings : {
        ".status" : "status"
    },
    serializeData: function() {
        var data = this.model.toJSON();

        if (data.status == "completed")
            data.checked = true;

        return data;
    },
    onShow: function() {
        this.stickit();
    },
    wantsToggleCompleteTask: function() {
        if (this.model.get("status") == "active")
        {
            this.model.set({status: "completed"});
        }
        else {
            this.model.set({status: "active"});
        }
    },
    wantsRemoveTask: function() {
        this.model.destroy()
    },
    wantsEditTask: function() {
        this.ui.span.attr("contenteditable", "true");
    },
    wantsSaveTask: function(event) {
        if (event.keyCode == 13) {
            this.model.set({task_name: this.ui.span.text()})
            this.ui.span.attr("contenteditable", "false");
        }
    }
});

exports.TaskView = TaskView;

});
