'use strict';

define([
    'jquery',
    'underscore',
    'backbone'
],
function SearchBarView($, _, Backbone) {
    var SearchBar = {};

    /**
     * Search Options
     * @type {Object}
     */
    SearchBar.options = {
        componentRestrictions: {
            country: 'usa'
        }
    };

    /**
     * Render search bar
     */
    SearchBar.render = function() {
        // assign autocomplete
        this.search = new google.maps.places.Autocomplete(this.el[0], this.options);

        // added event handle
        google.maps.event.addListener(this.search, 'place_changed', function() {
            this.changed();
        }.bind(this));
    };

    /**
     * When search bar value is changed
     */
    SearchBar.changed = function() {
        var place = this.search.getPlace();

        // trigger search
        Backbone.search.trigger('search', {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        });
    };

    return Backbone.View.extend(SearchBar);
});
