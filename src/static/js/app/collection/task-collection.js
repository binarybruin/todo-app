// define Task Collection

var TaskList = Backbone.Collection.extend({
    model: Task

    // add task to list on keypress ENTER
    add_task: function(taskName) {
        // check task is not empty string
        if (!(taskName == ""))
            this.add(model, {task_name: taskName, completed: false});
    }

    // delete task on button press (model.destroy)
    delete_task: function(model) {
        model.destroy();
    }

    // filter functions (where)


    // delete completed tasks IF event is pressed (clear button)

});
