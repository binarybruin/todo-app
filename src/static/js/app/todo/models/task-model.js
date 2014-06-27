// define Task Model

define(function( require, exports, module ){

var backbone = require('backbone');

var Filters = {
    all: "all",
    active: "active",
    completed: "completed"
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
