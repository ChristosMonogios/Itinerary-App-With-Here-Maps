mapApp.controller("MapController", ["$rootScope", "$scope", "RouteService", "ItineraryService", "MapService",
    function ($rootScope, $scope, RouteService, ItineraryService, MapService) {        
        MapService.initializeMap();
        
        $scope.$watchCollection(function () { return ItineraryService.getItinerary(); }, 
            function (newItinerary, oldItinerary) {
                if (newItinerary !== oldItinerary) {
                    if (newItinerary.length > 1) {
                        var transportationMode = ItineraryService.getTransportationMode();
                        getNewRoute(transportationMode);
                    } else {
                        MapService.initializeMap();
                    }
                }
            }
        );
        
        $scope.$watch(function () { return ItineraryService.getTransportationMode(); }, 
            function (newMode, oldMode) {
                if (newMode !== oldMode) {
                    getNewRoute(newMode);
                }
            }, true
        );
        
        var getNewRoute = function(transportationMode) {
            var itinerary = ItineraryService.getItinerary();
            var waypointsAsGetParameters = "";
            for(var i=0; i<itinerary.length; i++) {
                waypointsAsGetParameters += "waypoint" + i + "=" + 
                    itinerary[i].position.lat + "," + itinerary[i].position.lon + 
                    (i != itinerary.length -1 ? "&" : "");
            }
            
            RouteService.get({ mode: transportationMode.mode, waypoints: waypointsAsGetParameters, combineChange: transportationMode.combineChange })
                .$promise.then(function(data) {
                    MapService.drawRouteInMap(data);
            }).catch(function(error) {
                if (error.data.additionalData[0].value === "NGEO_ERROR_GRAPH_DISCONNECTED") {
                    MapService.initializeMap();
                    console.log("no route found"); // TODO: Do a bootstrap-alert
                    return;
                }
            });
        }
    }
]);