// define filter itemview

define(function (require, exports, module) {

var marionette = require('marionette');
var filter_template = require('hbs!../templates/filter-template');

var Filters = require('../models/task-model').Filters;

var FilterView = marionette.ItemView.extend({
    template : filter_template,
    currentFilter: Filters.all,

    events: {
        // get filtered tasks and display them on tab click
        "click .all" : "allWasClicked",
        "click .active" : "activeWasClicked",
        "click .completed" : "completedWasClicked",
    },

    allWasClicked: function(){
        this.triggerFilter(Filters.all);
    },

    activeWasClicked: function(){
        this.triggerFilter(Filters.active);
    },

    completedWasClicked: function(){
        this.triggerFilter(Filters.completed);
    },

    shouldTriggerFilter: function(filter){
        if(filter == this.currentFilter){
            return false;
        }

        return true;
    },

    serializeData: function(){
        return Filters;
    },

    triggerFilter: function(filter){
        if(!this.shouldTriggerFilter(filter)) return;

        this.currentFilter = filter;
        this.trigger(filter, this);
    }
});

exports.FilterView = FilterView;

});
