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
        this.listenTo(this.filter_list, 'all', this.wantsFilter)
    },

    ui : {
        // filter links
        input: ".all .active .completed"
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
    getAllTasks: function() {
        console.log("clicked all")
    },

    // get active tasks
    getActiveTasks: function() {
        console.log("clicked active")
        /*active_tasks = this.collection.where({status: "active"});
        return this.collection.filter(function(active_tasks) {
            return
        });*/
    },

    // get completed tasks
    getCompletedTasks: function() {
        console.log("clicked completed")
        //var completed_tasks = this.collection.where({status: "completed"});
    }
});

exports.TaskListView = TaskListView;

});
