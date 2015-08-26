'use strict';

define([
    'jquery',
    'underscore',
    'backbone'
], function TruckCollection($, _, Backbone) {
    var Truck = {};

    /**
     * API URL
     * @type {String}
     */
    Truck.url = '/api/trucks';

    /**
     * Parse Response
     * @param  {Array} response
     * @return {Array}
     */
    Truck.parse = function(response) {
        if (response.length) {
            response.forEach(function(data) {
                // split tags
                data.tags = (data.fooditems) ? data.fooditems.split(new RegExp(': |:', 'g')) : [];
            });
        }

        return response;
    };

    /**
     * Filter by category
     * @param  {String} category
     * @return {Object}
     */
    Truck.byCategory = function(categories) {
        if (categories.length === 0) return this;

        var filtered = this.filter(function(truck) {
                var i = categories.length;

                while(i--) {
                    if (truck.attributes.tags.indexOf(categories[i]) > -1) {
                        return true;
                    }
                }
            });

        return filtered;
    };

    return Backbone.Collection.extend(Truck);
});