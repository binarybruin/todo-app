var tests = [
    // Load mocks and vendor init
    'tests/mocks/init',
    'tests/vendor/init',

    // ---------------------------
    // Load Specs (AKA tests)
    'tests/spec-app-header',
    'tests/spec-app-task',
];

requirejs.config({
    baseUrl: '/base/src/static/js',

    paths:{
        'tests': 'specs',
        'jasmine': 'specs/vendor/jasmine',
        'helpers': 'specs/vendor/spec-helpers',
    },

    shim: {
        'jasmine/jasmine-jquery': {
            'deps': ['jquery']
        },
    },

    deps: tests,

    callback: window.__karma__.start
});
