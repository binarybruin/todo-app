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
            var taskView = new TaskView();
            expect(taskView).not.toEqual(undefined);
        });

        it('task should be editable on double click', function() {
            var spy = spyOn(TaskView.prototype, 'wantsEditTask').and.callThrough();
            var task = new Task({task_name: "test"});
            var taskView = new TaskView({model: task});
            region.show(taskView);
            var tasktext = document.getElementsByClassName("task_text");
            var position = $(tasktext).position();
            Events.simulateMouseDblClick($(tasktext), position.left, position.top);
            expect(spy).toHaveBeenCalled();
            expect(taskView.ui.span.attr("contenteditable")).toEqual("true");
        });

        it('task should update on enter after editing (and contenteditable is false)', function() {
            var spy = spyOn(TaskView.prototype, 'wantsSaveTask').and.callThrough();
            var task = new Task({task_name: "test"});
            var taskView = new TaskView({model: task});
            region.show(taskView);
            var tasktext = document.getElementsByClassName("task_text");
            var position = $(tasktext).position();
            Events.simulateMouseDblClick($(tasktext), position.left, position.top);
            Events.insertChar(taskView.ui.span, "test 2")
            Events.simulateKeyPress(taskView.ui.span, helpers.KeyCodes.return);

            expect(spy).toHaveBeenCalled();
            expect(task.get("task_name")).toEqual("testtest 2");
            expect(taskView.ui.span.attr("contenteditable")).toEqual("false");
        });

        it('should update status on task toggle complete', function() {
            var spy = spyOn(TaskView.prototype, 'wantsToggleCompleteTask').and.callThrough();
            var task = new Task({task_name: "test"});
            var taskView = new TaskView({model: task});
            region.show(taskView);
            var tasktoggle = document.getElementsByClassName("toggle_complete");
            var position = $(tasktoggle).position();
            Events.simulateMouseClick($(tasktoggle), position.left, position.top);
            expect(task.get("status")).toEqual("completed");
            Events.simulateMouseClick($(tasktoggle), position.left, position.top);
            expect(spy).toHaveBeenCalled();
            expect(task.get("status")).toEqual("active");
        });

        it('should delete task on delete button click', function() {
            var spy = spyOn(TaskView.prototype, 'wantsRemoveTask').and.callThrough();
            var task = new Task({task_name: "test"});
            var taskView = new TaskView({model: task});
            region.show(taskView);
            var taskdelete = document.getElementsByClassName("delete_button");
            var position = $(taskdelete).position();
            Events.simulateMouseClick($(taskdelete), position.left, position.top);
            //console.log(task)
            expect(spy).toHaveBeenCalled();
            //expect(taskView).toEqual(undefined);
        });

    });

});
