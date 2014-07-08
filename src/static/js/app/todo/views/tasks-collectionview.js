// define TaskList CollectionView

define(function (require, exports, module) {

var marionette = require('marionette');
var TaskView = require('./task-itemview').TaskView;
var TaskList            = require('app/todo/collections/task-collection').TaskList;

var DragAndDropCollectionView = require('vendor/built/ui/views/collection/drag-and-drop').DragAndDropCollectionView;
var ScrollManager = require('vendor/built/core/managers/scroll').ScrollManager;

var TaskListView =  DragAndDropCollectionView.extend({
    itemView : TaskView,

    ui : {
        // filter links
        input: ".all .active .completed"
    },

    events: {

    },

    initialize : function(options){
        //this.collection = options.collection;

        this.master = options.master;
        this.status = options.status;

        DragAndDropCollectionView.prototype.initialize.apply(this, arguments);

        this.DragAndDropCollectionView = options.collection;

        if (this.status) {
            this.DragAndDropCollectionView = new TaskList(this.master.where({status: this.status}))
            this.listenTo(this.master, 'add', this.onTaskAdded)
            this.listenTo(this.master, 'remove', this.onTaskRemoved)
            this.listenTo(this.master, 'change:status', this.onStatusChanged)
        }
        else
            this.DragAndDropCollectionView = this.master;
    },


    onTaskAdded: function(model) {
        if(model.get("status") == this.status) {
            this.DragAndDropCollectionView.add(model);
            console.log("task added", model)
        }
    },

    onTaskRemoved: function(model) {
        console.log("task removed")
    },

    onStatusChanged: function(model){
        if (model.get("status") == this.status) {
            this.DragAndDropCollectionView.add(model);
            return;
        }
        if (model.previousAttributes().status == this.status)
            this.DragAndDropCollectionView.remove(model);
    }
});

exports.TaskListView = TaskListView;

});
