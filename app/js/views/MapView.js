'use strict';

define([
    'jquery',
    'underscore',
    'backbone'
],
function MapView($, _, Backbone) {
    var Map = {};

    /**
     * Map DOM
     * @type {Object}
     */
    Map.el = $('#map');

    /**
     * List of markers
     * @type {Array}
     */
    Map.markers = [];

    /**
     * Map bounds
     * @type {Object}
     */
    Map.bounds = new google.maps.LatLngBounds();

    /**
     * Map options
     * @type {Object}
     */
    Map.options = {
        zoom: 12,
        center: new google.maps.LatLng(37.7577, -122.4376), // San Francisco
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    /**
     * Initialize
     */
    Map.initialize = function() {
        this.map = new google.maps.Map(this.el, this.options);
    };

    /**
     * Set map location
     */
    Map.setLocation = function(location) {
        var center = new google.maps.LatLng(location.lat, location.lng);

        this.map.panTo(center);
    };

    /**
     * Center map
     */
    Map.centerMap = function() {
        this.map.fitBounds(this.bounds);
        this.map.panToBounds(this.bounds); 
    };

    /**
     * Reset bounds
     */
    Map.resetBounds = function() {
        this.bounds = new google.maps.LatLngBounds();
    };

    /**
     * Add marker to the map
     * @param {Object} truck
     */
    Map.addMarker = function(truck) {
        if (!truck.location) return;

        var _this = this;

        // get info window
        var infowindow = this.infoWindow(truck);

        // create maker
        var marker = new google.maps.Marker({
                position: {
                    lat: truck.location.coordinates[1],
                    lng: truck.location.coordinates[0]
                },
                map: this.map,
                title: truck.applicant,
                infowindow: infowindow
            });

        // create point
        var point = new google.maps.LatLng(marker.position.lat(), marker.position.lng());

        // show info window
        google.maps.event.addListener(marker, 'click', function() {
            this.infowindow.open(_this.map, this);
        });

        // hide info window
        google.maps.event.addListener(this.map, 'click', function() {
            infowindow.close();
        });

        // add bound
        this.bounds.extend(point);

        // add markers
        this.markers.push(marker);
    };

    /**
     * Clear marker
     */
    Map.clearMarks = function() {
        var i = 0;
        var len = this.markers.length;

        for ( ; i < len; i++) {
            this.markers[i].setMap(null);
        }

        this.markers = [];
    };

    /**
     * Info window
     * @param  {Object} truck
     * @return {Object}
     */
    Map.infoWindow = function(truck) {
        var content = '<p><strong>' + truck.applicant + '</strong> <br>'
                    + truck.address + '<br> SAN FRANCISCO, CA</p>'
                    + '<p><em>' + truck.tags.join(', ').toLowerCase() + '</em></p>';

        return new google.maps.InfoWindow({ content: content });
    };

    /**
     * Show info window
     * @param  {Number} index
     */
    Map.showInfoWindow = function(index) {
        this.markers[index].infowindow.open(this.map, this.markers[index]);
    };

    /**
     * Hide info window
     * @param  {Nbumber} index
     */
    Map.hideInfoWindow = function(index) {
        this.markers[index].infowindow.close();
    };

    return Backbone.View.extend(Map);
});