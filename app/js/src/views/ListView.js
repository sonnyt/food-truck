'use strict';

define([
    'jquery',
    'underscore',
    'backbone',
    'text!../../../html/partials/list.html'
],
function ListView($, _, Backbone, listHTML) {
    var List = {};

    /**
     * Tag name
     * @type {String}
     */
    List.tagName = 'li';

    /**
     * Tag list class
     * @type {String}
     */
    List.className = 'truck-list-item';

    /**
     * Template
     * @type {Object}
     */
    List.template = _.template(listHTML);

    /**
     * Render
     * @return {Object}
     */
    List.render = function() {
        this.$el.html(this.template({ truck: this.model }, _));
                
        return this;
    };

    return Backbone.View.extend(List);
});