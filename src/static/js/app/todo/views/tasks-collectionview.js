// define TaskList CollectionView

define(function (require, exports, module) {

var marionette = require('marionette');
var TaskView = require('./task-itemview').TaskView;

var TaskListView =  marionette.CollectionView.extend({
    itemView : TaskView,
    initialize : function(){
        //console.log(this.collection)
    },
    ui : {
        // filter links
        input: "li"
    },
    events : {
        // get filtered tasks and display them on tab click
        "click .all" : "getAllTasks",
        "click .active" : "getActiveTasks",
        "click .completed" : "getCompletedTasks"
    },

    // get all tasks
    getAllTasks: function() {
        console.log("clicked all")
    },

    // get active tasks
    getActiveTasks: function() {
        console.log("clicked active")
        active_tasks = this.collection.where({status: "active"});
        return this.collection.filter(function(active_tasks) {
            return
        });
    },

    // get completed tasks
    getCompletedTasks: function() {
        console.log("clicked completed")
        var completed_tasks = this.collection.where({status: "completed"});
    }
});

exports.TaskListView = TaskListView;

});
