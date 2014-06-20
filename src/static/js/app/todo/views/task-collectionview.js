// define TaskList CollectionView

define(function (require, exports, module) {

var marionette = require('marionette');
var TaskView = require('./task-itemview').TaskView;

var TaskListView =  marionette.CollectionView.extend({
    itemView : TaskView,
    initialize : function(){
        console.log(this.collection)
    },
    ui : {

    },
    events : {

    }
});

exports.TaskListView = TaskListView;

});
