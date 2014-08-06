// define TaskList Collection

define(function( require, exports, module ){

var backbone = require('backbone');
var Task = require('../models/task-model').Task;

var TaskList =  backbone.Collection.extend({
    //urlRoot: '/api/v1/auction_item/',
    url: '/api/v1/task/',
    model: Task,

    // parse function to override Backbone's when collection.fetch() is called
    parse: function(data) {
        return data.objects;
    }
});

exports.TaskList = TaskList;

});
