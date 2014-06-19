// define Task Collection

var TaskList = Backbone.Collection.extend({
    model: Task

    // add task to list on keypress ENTER
    add_task: function(task) {
        this.add(task);
    }

    // delete task on button press (model.destroy)
    delete_task: function(task) {
        task.destroy();
    }

    // filter functions (where) - move to view??????


    // delete completed tasks IF event is pressed (clear button)


});
