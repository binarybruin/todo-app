define(function (require, exports, module) {

var marionette = require('marionette');
var template = require('hbs!../templates/todo-layout-template');

var TaskListView        = require('app/todo/views/tasks-collectionview').TaskListView;
var FilterView          = require('app/todo/views/filter-itemview').FilterView;

var Filters = require('../models/task-model').Filters;

var TodoLayout = marionette.Layout.extend({
    template : template,
    ui : {

        taskCount: ".tasksleft"

    },
    events : {

    },

    regions : {
        tasks: '.tasks',
        filterview: '#filterview'
    },

    initialize : function(options){

        this._status = options.status || Filters.all;
        this.collections = this.generatePartitions(options.master);
        this.master = options.master;

        this.listenTo(this.master, 'all', this.getActiveLength);
    },

    initFilterView: function(collections) {
        var filter_list = new FilterView();

        Object.keys(collections).forEach(function(key) {
            var target = collections[key];
        });

        return filter_list;

    },

    generatePartitions: function(master) {
        var all_list_view = new TaskListView({
            master: master
        });

        // create collectionviews for filtered tasks
        var active_list_view = new TaskListView({
            master: master,
            status: "active"
        });

        var completed_list_view = new TaskListView({
            master: master,
            status: "completed"
        });

        var result = {};
        result[Filters.all] = all_list_view;
        result[Filters.active] = active_list_view;
        result[Filters.completed] = completed_list_view;

        return result;
    },

    onShow: function() {
        var filterview = this.initFilterView(this.collections);

        this.listenTo(filterview, Filters.all, this.wantsFilter)
        this.listenTo(filterview, Filters.active, this.wantsFilter)
        this.listenTo(filterview, Filters.completed, this.wantsFilter)

        this.filterview.show(filterview);
        this.showCollection(this._status);
    },

    wantsFilter: function(view) {
        this.showCollection(view.currentFilter);
    },

    showCollection: function(value) {
        // check valid filter input
        var collection = this.collections[value];
        // if input is nonsense, set default filter ALL
        if (!collection){
            value = Filters.all
            collection = this.collections[value];
        }

        this._status = value;

        // show collection view
        this.tasks.show(collection, {preventClose:true});

    },

    getActiveLength: function() {
        // count how many active tasks are left
        var num = this.collections[Filters.active].collection.length;
        this.ui.taskCount.text(num);
        //console.log(num)
    }
});

exports.TodoLayout = TodoLayout;

});
