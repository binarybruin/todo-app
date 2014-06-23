// define filter itemview

define(function (require, exports, module) {

var marionette = require('marionette');
var filter_template = require('hbs!../templates/filter-template');

var FilterView = marionette.ItemView.extend({
    template : filter_template,
    ui : {

    },
    events : {

    },
    initialize : function(){

    }
});

exports.FilterView = FilterView;

});
