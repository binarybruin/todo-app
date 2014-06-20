// define TaskList CollectionView

define(function (require, exports, module) {

var marionette = require('marionette');
var TaskView = require('./task-itemview').TaskView;

var TaskListView =  marionette.CollectionView.extend({
    itemView : TaskView,
    initialize : function(){

    },
    ui : {

    },
    events : {

    }
});

exports.TaskListView = TaskListView;

});

/*
TaskListCollectionView = Backbone.Marionette.CollectionView.extend({...});

new TaskListCollectionView({
  itemView: MyItemView
});

// add listener function for key press ENTER to add task to collection
    function() {
        // check task is not empty string
        if (!(taskName == ""))
            task.set({task_name: taskName, status: "active"});
        // add to collection

    }

// add filter functions

// add function to clear completed tasks
*/
