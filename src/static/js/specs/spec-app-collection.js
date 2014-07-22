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

        it('create (on initialize) a new collection based on status (click on filter)', function() {
            // create default/active task list
            var taskListView = new TaskListView({collection: new TaskList()});
            expect(taskListView).not.toEqual(undefined);

            // create completed task list

        });

        it('when task is added, master/active collection should increase by one', function() {
            var spy = spyOn(TaskListView.prototype, 'onTaskAdded').and.callThrough();
            var taskList = new TaskList();
            var taskListView = new TaskListView({collection: taskList});
            region.show(taskListView);
            taskList.add({task_name: "test"});
            console.log(taskList.at(0))
            //expect(spy).toHaveBeenCalled();
        });

        it('when task is removed, all collections should decrease by one', function() {

        });

        it('when task is toggled completed/active, active/completed collections should update (increase/decrease)', function() {

        });

    });

});
