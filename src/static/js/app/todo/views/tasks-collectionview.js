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

        /*if(this.filter_list == 'active')
            this.active_list = this.collection;

        if(this.filter_list == 'completed')
            this.completed_list = this.collection;*/

        this.listenTo(this.filter_list, 'all', this.wantsFilter)
        this.listenTo(this.filter_list, 'active', this.wantsFilter)
        this.listenTo(this.filter_list, 'completed', this.wantsFilter)

        this.master = options.master;
        this.listenTo(this.master, 'add', this.onTaskAdded)
        this.listenTo(this.master, 'remove', this.onTaskRemoved)
        this.listenTo(this.master, 'hasChanged', this.onStatusChanged)
    },

    ui : {
        // filter links
        input: ".all .active .completed"
    },

    onTaskAdded: function(model) {
        if(model.get("status") == "active") {
            //this.collection.add(model);
            //console.log(this.collection)
        }
        /*else if (model.get('status') == "completed")
            this.completed_list.add(model);*/

        console.log("task added")
    },

    onTaskRemoved: function(model) {
        console.log("task removed")
    },

    onStatusChanged: function(){
        console.log("task status changed")
    },

    wantsFilter: function(e) {
        //console.log(e)
        switch(e) {
            case Filters.all:
                this.getAllTasks();
                break;
            case Filters.active:
                this.active_list = this.collection.where({status: "active"})
                this.getActiveTasks();
                break;
            case Filters.completed:
                this.completed_list = this.collection.where({status: "completed"})
                this.getCompletedTasks();
                break;
        }
    },

    // get all tasks
    getAllTasks: function(view) {
        console.log("clicked all")
        console.log(this.master)
        //this.app.tasks.show(view);
        //return this.collection;
    },

    // get active tasks
    getActiveTasks: function() {
        console.log("clicked active")
        console.log(this.active_list)
        /*active_tasks = this.collection.where({status: "active"});
        return this.collection.filter(function(active_tasks) {
            return
        });*/
        //return this.active_list;
    },

    // get completed tasks
    getCompletedTasks: function() {
        console.log("clicked completed")
        console.log(this.completed_list)
        //var completed_tasks = this.collection.where({status: "completed"});
        //return this.completed_list;
    }
});

exports.TaskListView = TaskListView;

});
