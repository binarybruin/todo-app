// define Task Model

define(function( require, exports, module ){

var backbone = require('backbone');

var Filters = {
    all: "filter:all",
    active: "filter:active",
    completed: "filter:completed"
};

var Task = backbone.Model.extend({
    defaults: {
        task_name: "",
        status: "active"
    }
});

exports.Task = Task;
exports.Filters = Filters;

});
