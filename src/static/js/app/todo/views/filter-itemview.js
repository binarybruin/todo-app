// define filter itemview

define(function (require, exports, module) {

var marionette = require('marionette');
var filter_template = require('hbs!../templates/filter-template');

var Filters = require('../models/task-model').Filters;

var FilterView = marionette.ItemView.extend({
    template : filter_template,

    ui : {

        span: ".tasksleft"

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

});
