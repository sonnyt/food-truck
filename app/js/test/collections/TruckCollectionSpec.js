'use strict';

define([
    'jquery',
    'underscore',
    'backbone',
    'collections/TruckCollection'
],
function ($, _, Backbone, TruckCollection) {
    var collection, server, data;

    describe('Truck Collection', function() {
        it ('should exist', function () {
            var collection = new TruckCollection();

            expect(collection).toBeDefined();
        });

        beforeEach(function () {
            data = [
                {
                    "address": "55 09TH ST",
                    "applicant": "Sun Rise Catering",
                    "approved": "2014-09-10T15:57:43.000",
                    "block": "3701",
                    "blocklot": "3701066",
                    "cnn": "446000",
                    "expirationdate": "2015-03-15T00:00:00.000",
                    "facilitytype": "Truck",
                    "fooditems": "Cold Truck: sandwiches: drinks: snacks: candy: hot coffee",
                    "latitude": "37.7770972708968",
                    "location":{
                        "type": "Point",
                        "coordinates":[-122.415102651351,37.7770972846803]
                    },
                    "locationdescription": "09TH ST: LARKIN ST \\ MARKET ST to JESSIE ST (1 - 55)",
                    "longitude": "-122.415102651361",
                    "lot": "066",
                    "objectid": "509479",
                    "permit": "14MFF-0001",
                    "priorpermit": "1",
                    "received": "Jan  8 2014  3:11PM",
                    "schedule": "http://bsm.sfdpw.org/PermitsTracker/reports/report.aspx?title=schedule&report=rptSchedule&params=permit=14MFF-0001&ExportPDF=1&Filename=14MFF-0001_schedule.pdf",
                    "status": "EXPIRED",
                    "x": "6008215.23641",
                    "y": "2111083.64845"
                },
                {
                    "address": "8 10TH ST",
                    "applicant": "Senor Sisig",
                    "approved": "2015-03-17T12:34:51.000",
                    "block": "3507",
                    "blocklot": "3507041",
                    "cnn": "480000",
                    "expirationdate": "2016-03-15T00:00:00.000",
                    "facilitytype": "Truck",
                    "fooditems": "Senor Sisig: Filipino fusion food: tacos: burritos: nachos: rice plates. Various beverages.Chairman Bao: Vegetable and meat sandwiches filled with Asian-flavored meats and vegetables.",
                    "latitude": "37.7758255197583",
                    "location":{
                        "type": "Point",
                        "coordinates": [-122.417249626633,37.7758255335431]
                    },
                    "locationdescription": "10TH ST: FELL ST \\ MARKET ST \\ POLK ST to END (1 - 18)",
                    "longitude": "-122.417249626643",
                    "lot": "041",
                    "objectid": "627145",
                    "permit": "15MFF-0031",
                    "priorpermit": "0",
                    "received": "Mar  5 2015 11:47AM",
                    "schedule": "http://bsm.sfdpw.org/PermitsTracker/reports/report.aspx?title=schedule&report=rptSchedule&params=permit=15MFF-0031&ExportPDF=1&Filename=15MFF-0031_schedule.pdf",
                    "status": "APPROVED",
                    "x": "6007585.376",
                    "y": "2110633.378"
                }
            ];

            server = sinon.fakeServer.create();
            server.respondWith('GET', '/api/trucks?lat=37&lng=-122',  [ 200, { 'Content-Type': 'application/json' }, JSON.stringify(data) ]);
        });

        afterEach(function() {
            server.restore();
        });

        it('should return data', function() {
            var trucks = new TruckCollection();
            var response = trucks.fetch({
                    data: $.param({ lat: 37, lng: -122 })
                });

                server.respond();

            response.then(function (resp) {
                expect(resp.length).toEqual(data.length);
            });
        });

        it('should not return any data', function() {
            var trucks = new TruckCollection();
                trucks.fetch({
                    data: $.param({ lat: 11, lng: 22 })
                });

                server.respond();

            expect(trucks.length).toEqual(0);
        });

        it('should return `tacos` category', function() {
            var trucks = new TruckCollection();
            var response = trucks.fetch({
                    data: $.param({ lat: 37, lng: -122 })
                });

                server.respond();
            
            var _filtered = trucks.byCategory(['tacos']);

            expect(_filtered.length).toEqual(1);
        });
    });
});