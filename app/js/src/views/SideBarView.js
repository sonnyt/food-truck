'use strict';

define([
    'jquery',
    'underscore',
    'backbone',
    'text!../../../html/partials/sidebar.html',
    'views/SearchBarView',
    'views/ListView',
],
function SideBarView($, _, Backbone, sidebarHTML, SearchBarView, ListView) {
    var SideBar = {};

    /**
     * Sidebar DOM
     * @type {Object}
     */
    SideBar.el = $('#sidebar');

    /**
     * Template
     * @type {Object}
     */
    SideBar.template = _.template(sidebarHTML);

    /**
     * Render view
     * @return {Object}
     */
    SideBar.render = function() {
        this.$el.html(this.template());

        // set elements
        this.list = this.$el.find('#truck-list');
        this.loader = this.$el.find('#loader');
        this.filter = this.$el.find('#filter');

        // reset truck list
        this.resetList();

        // list
        this.list.on('mouseenter', 'li.truck-list-item', function() {
            Backbone.marker.trigger('mouseenter', $(this).index());
        });

        this.list.on('mouseleave', 'li.truck-list-item', function() {
            Backbone.marker.trigger('mouseleave', $(this).index());
        });

        /**
         * Render Search
         * @type {SearchBarView}
         */
        var search = new SearchBarView();
            search.el = this.$('#search-bar');
            search.render();

        return this;
    };

    /**
     * Add a truck to the list
     * @param {Object} truck
     */
    SideBar.addTruck = function(truck) {
        if (!truck.location) return;

        var view = new ListView({ model: truck });

        this.list.append(view.render().el);
    };

    /**
     * Clear truck list
     */
    SideBar.clearList = function() {
        this.list.empty();
    };

    /**
     * Set no result truck list
     */
    SideBar.noResult = function() {
        this.list.html('<li class="empty">No Food Trucks Found</li>');
    };

    /**
     * Reset truck list
     */
    SideBar.resetList = function() {
        this.list.html('<li class="empty">Enter Your Address</li>');
    };

    /**
     * Show loading message
     */
    SideBar.showLoading = function() {
        this.loader.show();
    };

    /**
     * Hide loading message
     */
    SideBar.hideLoading = function() {
        this.loader.hide();
    };

    /**
     * Show filters
     */
    SideBar.showFilters = function() {
        this.filter.show();
    };

    /**
     * Hide filters
     */
    SideBar.hideFilters = function() {
        this.filter.hide();
    };

    return Backbone.View.extend(SideBar);
});
