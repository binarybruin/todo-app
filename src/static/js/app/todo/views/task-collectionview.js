// define Task CollectionView

TaskListCollectionView = Backbone.Marionette.CollectionView.extend({...});

new TaskListCollectionView({
  itemView: MyItemView
});

// add listener function for key press ENTER to add task to collection
    function() {
        // check task is not empty string
        if (!(taskName == ""))
            task.set({task_name: taskName, status: "active"});
        // add to collection

    }

// add filter functions

// add function to clear completed tasks
