define(function (require, exports, module) {

var marionette = require('marionette');
var template = require('hbs!../templates/template');

var HeaderView = marionette.ItemView.extend({
    template : template,
    ui : {

    },
    events : {

    },
    initialize : function(){

    }
});

exports.Headeriew = HeaderView;

});
