'use strict';

require.config({
    paths: {
        underscore: 'libs/underscore-min',
        backbone: 'libs/backbone-min',
        jquery: 'libs/jquery.min',
        text: 'libs/text'
    }
});

require([
    'views/AppView'
],
function(AppView) {
    new AppView;
});