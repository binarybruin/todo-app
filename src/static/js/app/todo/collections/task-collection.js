// define TaskList Collection

define(function( require, exports, module ){

var backbone = require('backbone');
var Task = require('../models/task-model').Task;

var TaskList =  backbone.Collection.extend({
    //urlRoot: '/api/v1/auction_item/',
    model: Task
});

exports.TaskList = TaskList;

});
