define(function (require, exports, module) {

var marionette = require('marionette');

var templateFooterTest = require('hbs!app/sample/templates/footer-test');

var FooterView = marionette.ItemView.extend({
    template : templateFooterTest
});

exports.FooterView = FooterView;

});
