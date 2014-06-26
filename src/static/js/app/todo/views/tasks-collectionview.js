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
            this.collection.add(model);
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
                this.getActiveTasks();
                this.collection = this.master;
                break;
            case Filters.completed:
                this.getCompletedTasks();
                this.collection = this.master;
                break;
        }
    },

    // get all tasks
    getAllTasks: function(view) {
        console.log("clicked all")
        console.log(this.master)

        return this.master;
    },

    // get active tasks
    getActiveTasks: function() {
        console.log("clicked active")

        var active_list = this.master.where({status: "active"})

        this.collection.set(active_list)

        console.log(this.collection)

        return this.collection;
    },

    // get completed tasks
    getCompletedTasks: function() {
        console.log("clicked completed")

        var completed_list = this.master.where({status: "completed"})

        this.collection.set(completed_list)

        console.log(this.collection)

        return this.collection;
    }
});

exports.TaskListView = TaskListView;

});
