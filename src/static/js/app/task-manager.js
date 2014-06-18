// define Task Manager

var TaskList = new TaskList();

var Task = Backbone.Model.extend({
    defaults: {
        task_name: "",
        completed: false
    }
});

