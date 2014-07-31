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

        this._status = options.status || "all";
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

        this.listenTo(filterview, 'all', this.wantsFilter)
        this.listenTo(filterview, 'active', this.wantsFilter)
        this.listenTo(filterview, 'completed', this.wantsFilter)

        this.filterview.show(filterview);

        //console.log(this.tasks)
        this.showCollection(this._status);

        // console.log(this.$el, this.ui);
        // debugger;
    },

    wantsFilter: function(e) {
        this.trigger(e)
        this.showCollection(e);
    },

    showCollection: function(value) {
        // check valid filter input
        var collection = this.collections[value];

        // if input is nonsense, set default filter ALL
        if (!collection)
            collection = this.collections[Filters.all];

        // show collection view
        this.tasks.show(collection, {preventClose:true});

    },

    getActiveLength: function() {
        // count how many active tasks are left
        var tasks_left = this.master.where({status: "active"});
        var num = tasks_left.length;
        //console.log(num)
        this.ui.taskCount.text(num);
        //console.log(this.ui.taskCount.text());
    }
});

exports.TodoLayout = TodoLayout;

});
