define(function(require, exports, module) {

    var marionette = require('marionette');

    var TaskView = require('app/todo/views/task-itemview').TaskView;

    var TaskListView = require('app/todo/views/tasks-collectionview').TaskListView;

    var Task = require('app/todo/models/task-model').Task;

    var TaskList = require('app/todo/collections/task-collection').TaskList;

    var FilterView = require('app/todo/views/filter-itemview').FilterView;

    var TodoLayout = require('app/todo/views/todo-layout').TodoLayout;

    var Filters = require('app/todo/models/task-model').Filters;

    var helpers = require('helpers');
    var Events = helpers.Events

    describe('my todo layout', function() {

        var region;

        beforeEach(function() {
            region = new marionette.Region({el:'.container'});
            loadFixtures('template.html');
        });

        it('initialize', function() {
            var spy = spyOn(TodoLayout.prototype, 'generatePartitions').and.callThrough();
            var master = new TaskList();
            var todoLayout = new TodoLayout({status: "all", master: master});
            expect(todoLayout).not.toEqual(undefined);

            // check generate partitions
            expect(spy).toHaveBeenCalled();

            region.show(todoLayout);

            // add tasks to master and check partitions
            master.add({task_name: "test1", status: "active"});
            master.add({task_name: "test2", status: "active"});
            master.add({task_name: "test3", status: "completed"});
            region.show(todoLayout);
            var collections = todoLayout.generatePartitions(master);
            var allcollection = collections[Filters.all];
            var activecollection = collections[Filters.active];
            var compcollection = collections[Filters.completed];

            expect(collections).not.toEqual(undefined);
            expect(allcollection.collection.length).toEqual(3);
            expect(activecollection.collection.length).toEqual(2);
            expect(compcollection.collection.length).toEqual(1);
        });

        it('initialize filter view', function() {
            var todoLayout = new TodoLayout({status: "all", master: new TaskList()});
            expect(todoLayout).not.toEqual(undefined);

            var filterList = todoLayout.initFilterView(todoLayout.collections);
            expect(filterList).not.toEqual(undefined);
        });

        it('when task is added, master/active collection should increase by one', function() {
            var spy = spyOn(TaskListView.prototype, 'onTaskAdded').and.callThrough();
            var master = new TaskList();
            var todoLayout = new TodoLayout({status: "all", master: master});
            var task = new Task({task_name: "test"});
            region.show(todoLayout);
            master.add(task);
            expect(spy).toHaveBeenCalled();
            var collections = todoLayout.generatePartitions(master);
            expect(collections[Filters.all].collection.length).toEqual(1);
            expect(collections[Filters.active].collection.length).toEqual(1);
        });

        it('when task is removed, collections should decrease by one', function() {
            var spy = spyOn(TaskListView.prototype, 'onTaskRemoved').and.callThrough();
            var master = new TaskList();
            var todoLayout = new TodoLayout({status: "all", master: master});
            var task = new Task({task_name: "test"});
            region.show(todoLayout);
            var collections = todoLayout.generatePartitions(master);
            master.add(task);
            expect(collections[Filters.all].collection.length).toEqual(1);
            expect(collections[Filters.active].collection.length).toEqual(1);


            master.remove(task);
            collections = todoLayout.generatePartitions(master);
            expect(spy).toHaveBeenCalled();
            region.show(todoLayout);
            //console.log(collections[Filters.active].collection.length)
            expect(collections[Filters.all].collection.length).toEqual(0);
            expect(collections[Filters.active].collection.length).toEqual(0);
        });

        it('when task is toggled completed/active, active/completed collections should update (increase/decrease)', function() {
            var spy = spyOn(TaskListView.prototype, 'onStatusChanged').and.callThrough();
            var master = new TaskList();
            var todoLayout = new TodoLayout({status: "all", master: master});
            var task = new Task({task_name: "test"});
            region.show(todoLayout);
            master.add(task);
            task.set({status: "completed"});
            expect(spy).toHaveBeenCalled();
            var collections = todoLayout.generatePartitions(master);
            expect(collections[Filters.all].collection.length).toEqual(1);
            expect(collections[Filters.active].collection.length).toEqual(0);
            expect(collections[Filters.completed].collection.length).toEqual(1);
        });

        it('check collection is correct on filter click', function() {
            var spy = spyOn(TodoLayout.prototype, 'wantsFilter').and.callThrough();
            var master = new TaskList();
            var todoLayout = new TodoLayout({status: "active", master: master});
            expect(todoLayout).not.toEqual(undefined);

            region.show(todoLayout);

            // add tasks to master and check partitions
            master.add({task_name: "test1", status: "active"});
            master.add({task_name: "test2", status: "active"});
            master.add({task_name: "test3", status: "completed"});
            //region.show(todoLayout);

            var allFilter = document.getElementsByClassName("all");
            var position = $(allFilter).position();
            Events.simulateMouseClick($(allFilter), position.left, position.top);
            expect(spy).toHaveBeenCalled();
            //region.show(todoLayout);
            console.log(todoLayout._status)
            //expect(todoLayout._status).toEqual("completed");
        });

        it('check number of active tasks left', function() {
            var spy = spyOn(TodoLayout.prototype, 'getActiveLength').and.callThrough();
            var master = new TaskList();
            var todoLayout = new TodoLayout({status: "active", master: master});
            expect(todoLayout).not.toEqual(undefined);

            region.show(todoLayout);

            // add tasks to master and check partitions
            master.add({task_name: "test1", status: "active"});
            master.add({task_name: "test2", status: "active"});
            master.add({task_name: "test3", status: "completed"});

            expect(spy).toHaveBeenCalled();
            expect(todoLayout.ui.taskCount.text()).toEqual("2");
        });

    });

});
