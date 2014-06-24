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
    },
    events : {
        // get filtered tasks and display them on tab click
    },

    // get active tasks
    getActiveTasks: function() {

    },

    // get completed tasks
    getCompletedTasks: function() {

    }
});

exports.TaskListView = TaskListView;

});
