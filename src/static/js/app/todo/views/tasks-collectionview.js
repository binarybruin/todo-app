// define TaskList CollectionView

define(function (require, exports, module) {

var marionette = require('marionette');
var TaskView = require('./task-itemview').TaskView;
var TaskList            = require('app/todo/collections/task-collection').TaskList;

var TaskListView =  marionette.CollectionView.extend({
    itemView : TaskView,

    ui : {
        // filter links
        input: ".all .active .completed"
    },

    initialize : function(options){
        this.collection = options.collection;

        this.master = options.master;
        this.status = options.status;

        if (this.status) {
            this.collection = new TaskList(this.master.where({status: this.status}))
            this.listenTo(this.master, 'add', this.onTaskAdded)
            this.listenTo(this.master, 'remove', this.onTaskRemoved)
            this.listenTo(this.master, 'change:status', this.onStatusChanged)
        }
        else
            this.collection = this.master;
    },

    onTaskAdded: function(model) {
        if(model.get("status") == this.status) {
            this.collection.add(model);
            console.log("task added", model)
        }
    },

    onTaskRemoved: function(model) {
        console.log("task removed")
    },

    onStatusChanged: function(model){
        if (model.get("status") == this.status) {
            this.collection.add(model);
            return;
        }
        if (model.previousAttributes().status == this.status)
            this.collection.remove(model);
    }
});

exports.TaskListView = TaskListView;

});
