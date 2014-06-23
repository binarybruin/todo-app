define(function(require, exports, module) {
    var marionette = require('marionette');
    var app = new marionette.Application();

    app.addRegions({
        window: '#window',
        modal: '#modal',
        activity: '#activity',
        header: '#header',
        footer: '#footer',
        tasks: '#tasks',
        inputview: '#inputview',
        filterview: '#filterview',
        active: '#active'
    });

    app.addInitializer(function() {
        Backbone.history.start({
            pushState: false
        });
    });


    return app;
});
