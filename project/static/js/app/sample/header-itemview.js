define(function (require, exports, module) {

var marionette = require('marionette');

var templateHeaderTest = require('hbs!app/sample/templates/header-test');

var HeaderView = marionette.ItemView.extend({
    template : templateHeaderTest
});

exports.HeaderView = HeaderView;

});
