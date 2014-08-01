define(function(require, exports, module) {

    var marionette = require('marionette');

    var TaskView = require('app/todo/views/task-itemview').TaskView;

    var TaskListView = require('app/todo/views/tasks-collectionview').TaskListView;

    var Task = require('app/todo/models/task-model').Task;

    var TaskList = require('app/todo/collections/task-collection').TaskList;

    var helpers = require('helpers');
    var Events = helpers.Events

    describe('my tasklist view', function() {

        var region;

        beforeEach(function() {
            region = new marionette.Region({el:'.container'});
            loadFixtures('template.html');
        });

        it('initialize', function() {
            var taskListView = new TaskListView({collection: new TaskList()});
            expect(taskListView).not.toEqual(undefined);
        });

        it('task list adding/removing tasks properly', function() {
            var task1 = new Task({task_name: "test1", status: "active"});
            var task2 = new Task({task_name: "test2", status: "completed"});

            var taskList = new TaskList();
            var taskListView = new TaskListView({collection: taskList});

            region.show(taskListView);

            taskList.add(task1);
            taskList.add(task2);

            expect(taskList.length).toEqual(2);

            taskList.remove(task1);

            expect(taskList.length).toEqual(1);
        });

        // LOOK AT LAYOUT TESTS TO CHECK PARTITIONED COLLECTIONS

    });

});
