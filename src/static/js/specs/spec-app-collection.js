define(function(require, exports, module) {

    var marionette = require('marionette');

    var TaskView = require('app/todo/views/task-itemview').TaskView;

    var TaskListView = require('app/todo/views/tasks-collectionview').TaskListView;

    var Task = require('app/todo/models/task-model').Task;

    var TaskList = require('app/todo/collections/task-collection').TaskList;

    var helpers = require('helpers');
    var Events = helpers.Events

    describe('my task view', function() {

        var region;

        beforeEach(function() {
            region = new marionette.Region({el:'.container'});
            loadFixtures('template.html');
        });

        it('initialize', function() {
            var taskListView = new TaskListView({collection: new TaskList()});
            expect(taskListView).not.toEqual(undefined);
        });

        // MOVED TO LAYOUT TESTS TO CHECK PARTITIONED COLLECTIONS
        /*it('when task is added, master/active collection should increase by one', function() {
            //var spy = spyOn(TaskListView.prototype, 'onTaskAdded').and.callThrough();
            var taskList = new TaskList();
            var taskListView = new TaskListView({collection: taskList, master: taskList});
            region.show(taskListView);
            var task = new Task({task_name: "test"});
            taskList.add(task);
            //expect(spy).toHaveBeenCalled();
            expect(taskList.length).toEqual(1);
        });

        it('when task is removed, collection should decrease by one', function() {
            //var spy = spyOn(TaskListView.prototype, 'onTaskRemoved').and.callThrough();
            var taskList = new TaskList();
            var taskListView = new TaskListView({collection: taskList});
            region.show(taskListView);
            var task = new Task({task_name: "test"});
            taskList.add(task);
            expect(taskList.length).toEqual(1);
            taskList.remove(task);
            //expect(spy).toHaveBeenCalled();
            expect(taskList.length).toEqual(0);
        });

        it('when task is toggled completed/active, active/completed collections should update (increase/decrease)', function() {
            //var spy = spyOn(TaskListView.prototype, 'onStatusChanged').and.callThrough();
            var taskList = new TaskList();
            var taskListView = new TaskListView({collection: taskList, _status: "active"});
            var completedList = new TaskList();
            region.show(taskListView);
            var task = new Task({task_name: "test"});
            taskList.add(task);
            expect(taskList.length).toEqual(1);
            task.set({status: "completed"});
            taskList.remove(task);
            completedList.add(task);
            //expect(spy).toHaveBeenCalled();
        });*/

    });

});
