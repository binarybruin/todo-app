define(function(require, exports, module) {
    var marionette = require('marionette');
    var app = new marionette.Application();

    app.addRegions({
        window: '#window',
        modal: '#modal',
        activity: '#activity',
        header: '#header',
        footer: '#footer',
        task: '#task',
        task_list: '#task-list'
    });

    app.addInitializer(function() {
        Backbone.history.start({
            pushState: false
        });
    });


    return app;
});
