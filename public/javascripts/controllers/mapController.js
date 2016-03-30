mapApp.controller("MapController", ["$scope", "RouteService", "ItineraryService", "MapService",
    function ($scope, RouteService, ItineraryService, MapService) {
        
        // init action for map area:       
        MapService.initializeMap();
        
        $scope.$watchCollection(function () { return ItineraryService.getItinerary(); }, 
            function (newItinerary, oldItinerary) {
                if (newItinerary !== oldItinerary) {
                    if(isItineraryARoute(newItinerary)) {
                        getNewRoute(ItineraryService.getItinerary(), ItineraryService.getTransportationMode());
                    } else if (isItineraryASinglePoint(newItinerary)) {
                        MapService.showPositionInMap(newItinerary[0].position.lat, newItinerary[0].position.lon);
                    }
                }
            }
        );
        
        $scope.$watch(function () { return ItineraryService.getTransportationMode(); }, 
            function (newMode, oldMode) {
                if (newMode.mode !== oldMode.mode) { // If the mode was changed, calculate the route again
                    getNewRoute(ItineraryService.getItinerary(), newMode);
                }
            }, true
        );
        
        function getNewRoute(itinerary, transportationMode) {
            var waypointsAsGetParameter = convertWaypointsToGETParameter(itinerary);
            
            RouteService.get({ mode: transportationMode.mode, waypoints: waypointsAsGetParameter, combineChange: transportationMode.combineChange })
                .$promise.then(function(data) {
                    ItineraryService.setSummaryText(data.response.route[0].summary.text);
                    MapService.drawRouteInMap(data);
            }).catch(function(error) {
                if (error.data && error.data.additionalData[0].value === "NGEO_ERROR_GRAPH_DISCONNECTED") {
                    ItineraryService.setSummaryText("");
                    MapService.removeRouteFromMap();
                    throw new Error("We found no route for the selected transportation mode!");
                }
                throw new Error("An unexpected error happened. Please try again!");
            });
        }
        
        function convertWaypointsToGETParameter() {
            var itinerary = ItineraryService.getItinerary(),
                itineraryLength = itinerary.length,
                waypointsAsGetParameter = "";
                
            for(var i=0; i<itineraryLength; i++) {
                waypointsAsGetParameter += "waypoint" + i + "=" + 
                    itinerary[i].position.lat + "," + itinerary[i].position.lon + 
                    (i != itinerary.length -1 ? "&" : "");
            }
             
            return waypointsAsGetParameter;
        }
        
        function isItineraryARoute(itinerary) {
            if (itinerary.length >= 2) {
                return true;
            }
            
            return false;
        }
        
        function isItineraryASinglePoint(itinerary) {
            if (itinerary.length === 1) {
                return true;
            }
            
            return false;
        }
    }
]);