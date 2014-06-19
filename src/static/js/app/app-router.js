define(function (require, exports, module) {

var marionette = require('marionette');
var AppController = require('app/app-controller').AppController;

var AppRouter  =  marionette.AppRouter.extend({
    controller: new AppController(),
    appRoutes:{
        '*test': 'test',
        '*index':'index',
    }
});

exports.AppRouter = AppRouter;

});
