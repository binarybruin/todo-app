define(function(require, exports, module) {

    var marionette = require('marionette');

    var InputView = require('app/todo/views/input-itemview').InputView;

    var TaskList = require('app/todo/collections/task-collection').TaskList;

    var helpers = require('helpers');
    var Events = helpers.Events

    describe('my header view', function() {

        var region;

        beforeEach(function() {
            region = new marionette.Region({el:'.container'});
            loadFixtures('template.html');
        });

        it('initialize', function() {
            var headerView = new InputView({collection: new TaskList()});
            expect(headerView).not.toEqual(undefined);
        });

        it('should fire wantsCreateTask on keypress enter', function(){
            var spy = spyOn(InputView.prototype, 'wantsCreateTask').and.callThrough();
            var headerView = new InputView({collection: new TaskList()});
            region.show(headerView);
            Events.simulateKeyPress(headerView.ui.input, helpers.KeyCodes.return);
            expect(spy).toHaveBeenCalled();
        });

        it('should do nothing if empty text is in input when enter key is pressed', function(){
            var headerView = new InputView({collection: new TaskList()});
            region.show(headerView);
            Events.simulateKeyPress(headerView.ui.input, '');
            Events.simulateKeyPress(headerView.ui.input, '       ');
            Events.simulateKeyPress(headerView.ui.input, helpers.KeyCodes.return);

            expect(headerView.collection.length).toEqual(0);
        });

        it('should create task when valid input', function(){
            var spy = spyOn(InputView.prototype, 'createTask').and.callThrough();
            var headerView = new InputView({collection: new TaskList()});
            region.show(headerView);
            // test dummy input and simulate keypress enter
            var test = "test";
            Events.insertChar(headerView.ui.input, test);
            Events.simulateKeyPress(headerView.ui.input, helpers.KeyCodes.return);

            expect(spy).toHaveBeenCalled();
            expect(headerView.collection.length).not.toEqual(0);
        });

        it('should fire wantsRemoveCompleted when "Clear Completed Tasks" is clicked', function(){
            var spy = spyOn(InputView.prototype, 'wantsRemoveCompleted').and.callThrough();
            var headerView = new InputView({collection: new TaskList()});
            region.show(headerView);
            var button = document.getElementsByClassName("clear_completed_button");
            var position = $(button).position();
            Events.simulateMouseClick($(button), position.left, position.top);
            expect(spy).toHaveBeenCalled();
        });

        it('should do nothing if "Clear Completed Tasks" is clicked and no task is checked', function(){
            var headerView = new InputView({collection: new TaskList()});
            region.show(headerView);
            // test dummy input and simulate keypress enter
            var test = "test";
            Events.insertChar(headerView.ui.input, test);
            Events.simulateKeyPress(headerView.ui.input, helpers.KeyCodes.return);

            var button = document.getElementsByClassName("clear_completed_button");
            var position = $(button).position();
            Events.simulateMouseClick($(button), position.left, position.top);

            expect(headerView.collection.length).not.toEqual(0);
        });

        it('should clear completed tasks', function(){
            var headerView = new InputView({collection: new TaskList()});
            region.show(headerView);
            // add dummy tasks
            headerView.createTask();
            headerView.createTask();
            headerView.createTask();

            // set second and third tasks to completed
            var task2 = headerView.collection.at(1);
            task2.set({status: "completed"});
            var task3 = headerView.collection.at(2);
            task3.set({status: "completed"});

            //console.log(headerView.collection)

            var button = document.getElementsByClassName("clear_completed_button");
            var position = $(button).position();
            Events.simulateMouseClick($(button), position.left, position.top);

            expect(headerView.collection.length).toEqual(1);
        });

    });

});
