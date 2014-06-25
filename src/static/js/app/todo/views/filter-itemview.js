// define filter itemview

define(function (require, exports, module) {

var marionette = require('marionette');
var filter_template = require('hbs!../templates/filter-template');

var Filters = {
    all: "filter:all",
    active: "filter:active",
    completed: "filter:completed"
};

var FilterView = marionette.ItemView.extend({
    template : filter_template,

    ui : {

    },

    triggers : {
        // get filtered tasks and display them on tab click
        "click .all" : Filters.all,
        "click .active" : Filters.active,
        "click .completed" : Filters.completed
    },

    initialize : function(){

    }
});

exports.FilterView = FilterView;
exports.Filters = Filters;

});
