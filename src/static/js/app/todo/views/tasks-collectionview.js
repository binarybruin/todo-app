// define TaskList CollectionView

define(function (require, exports, module) {

var marionette = require('marionette');
var TaskView = require('./task-itemview').TaskView;
var Filters = require('./filter-itemview').Filters;


var TaskListView =  marionette.CollectionView.extend({
    itemView : TaskView,
    initialize : function(options){
        //console.log(this.collection)
        this.filter_list = options.filter_list;
        this.collection = options.collection;
    },

    ui : {
        // filter links
        input: ".all .active .completed"
    },

    onTaskAdded: function(model) {
        //if(model.get('status') == "active")
            //this.active_list.add(model);
        /*else if (model.get('status') == "completed")
            this.completed_list.add(model);*/
    },

    wantsFilter: function(e) {
        console.log(e)
        switch(e) {
            case Filters.all:
                this.getAllTasks();
                break;
            case Filters.active:
                this.getActiveTasks();
                break;
            case Filters.completed:
                this.getCompletedTasks();
                break;
        }
    },

    // get all tasks
    getAllTasks: function(view) {
        console.log("clicked all")
        //this.app.tasks.show(view);
        //return this.collection;
    },

    // get active tasks
    getActiveTasks: function() {
        console.log("clicked active")
        /*active_tasks = this.collection.where({status: "active"});
        return this.collection.filter(function(active_tasks) {
            return
        });*/
        //return this.active_list;
    },

    // get completed tasks
    getCompletedTasks: function() {
        console.log("clicked completed")
        //var completed_tasks = this.collection.where({status: "completed"});
        //return this.completed_list;
    }
});

exports.TaskListView = TaskListView;

});
