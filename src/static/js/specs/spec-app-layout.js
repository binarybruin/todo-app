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

    describe('my task view', function() {

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
            var collections = todoLayout.generatePartitions(master);
            //console.log(collections[Filters.completed])
            expect(collections).not.toEqual(undefined);
        });

        it('initialize filter view', function() {
            var todoLayout = new TodoLayout({status: "all", master: new TaskList()});
            expect(todoLayout).not.toEqual(undefined);

            var filterList = todoLayout.initFilterView(todoLayout.collections);
            expect(filterList).not.toEqual(undefined);
        });

        it('check collection is correct on filter click', function() {
            var spy = spyOn(TodoLayout.prototype, 'wantsFilter').and.callThrough();
            var todoLayout = new TodoLayout({status: "all", master: new TaskList()});
            expect(todoLayout).not.toEqual(undefined);
            var filterList = todoLayout.initFilterView(todoLayout.collections);
            expect(filterList).not.toEqual(undefined);
            region.show(todoLayout);

            var completedFilter = document.getElementsByClassName("completed");
            var position = $(completedFilter).position();
            Events.simulateMouseClick($(completedFilter), position.left, position.top);
            expect(spy).toHaveBeenCalled();
            region.show(todoLayout);
            //todoLayout.showCollection(Filters.completed);
            console.log(todoLayout._status)
            //expect(todoLayout._status).toEqual("completed");
        });

    });

});
