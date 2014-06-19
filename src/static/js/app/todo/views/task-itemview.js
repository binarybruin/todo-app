// define Task Model ItemView

define(function (require, exports, module) {

var marionette = require('marionette');
var task_template = require('hbs!../templates/task-template');

var TaskView = marionette.ItemView.extend({
    template : task_template,
    ui : {

    },
    events : {

    },
    initialize : function(){

    }
});

exports.TaskView = TaskView;

});

// add listener function for mouse click on task delete button
