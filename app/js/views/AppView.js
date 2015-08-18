'use strict';

define([
    'jquery',
    'underscore',
    'backbone',
    'collections/TruckCollection',
    'views/MapView',
    'views/SideBarView'
],
function AppView($, _, Backbone, TrucksCollection, MapView, SideBarView) {
    var App = {};

    /**
     * Main container
     * @type {Object}
     */
    App.el = $('#food-truck');

    /**
     * Events
     * @type {Object}
     */
    App.events = {
        'click .check': 'filter'
    };

    /**
     * Trucks Collection
     * @type {Object}
     */
    App.trucks = new TrucksCollection();

    /**
     * Map
     * @type {Object}
     */
    App.map = new MapView();

    /**
     * Sidebar
     * @type {Object}
     */
    App.sidebar = new SideBarView();

    /**
     * Initzlize
     */
    App.initialize = function initialize() {
        // render parts
        this.map.render();
        this.sidebar.render();

        // when search is performed
        Backbone.search.on('search', function(location) {
            this.search(location);
        }.bind(this));

        // set highlights
        Backbone.marker.on('mouseenter', function(index) {
            this.map.showInfoWindow(index);
        }.bind(this));

        Backbone.marker.on('mouseleave', function(index) {
            this.map.hideInfoWindow(index);
        }.bind(this));
    };

    /**
     * Search List
     * @param  {Object} location
     */
    App.search = function(location) {
        if (!location.lat || !location.lng) return;

        // setup list
        this.sidebar.showLoading();
        this.sidebar.clearList();

        // set up map
        this.map.clearMarks();
        this.map.resetBounds();
        this.map.setLocation(location);

        // get trucks
        this.trucks.fetch({
            data: $.param(location)
        }).then(function (data) {
            if (data.length) {
                // for each data set DOM
                data.forEach(function(truck) {
                    this.map.addMarker(truck);

                    this.sidebar.addTruck(truck);
                }.bind(this));

                this.sidebar.showFilters();
                this.map.centerMap();
            } else {
                // no data
                this.sidebar.hideFilters();
                this.sidebar.noResult();
            }

            this.sidebar.hideLoading();
        }.bind(this));
    };

    /**
     * Filter
     * @param  {Object} e
     */
    App.filter = function(e) {
        var categories = $('.check:checked').map(function() {
                return this.value;
            });

        var data = this.trucks.byCategory(categories);

        // setup list
        this.sidebar.showLoading();
        this.sidebar.clearList();
        this.map.clearMarks();

        if (data.length) {
            data.forEach(function(truck) {
                this.map.addMarker(truck.attributes);

                this.sidebar.addTruck(truck.attributes);
            }.bind(this));
        } else {
            this.sidebar.noResult();
        }

        this.sidebar.hideLoading();
    };

    /**
     * Search event
     * @type {Object}
     */
    Backbone.search = _.extend({}, Backbone.Events);
    Backbone.marker = _.extend({}, Backbone.Events);

    return Backbone.View.extend(App);
});

