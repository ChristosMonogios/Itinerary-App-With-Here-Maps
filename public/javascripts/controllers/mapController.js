mapApp.controller("MapController", ["$rootScope", "$scope", "RouteService", "ItineraryService", "MapService",
    function ($rootScope, $scope, RouteService, ItineraryService, MapService) {
        $scope.transportationMode = "fastest;car";
        
        MapService.initializeMap();
        
        $scope.$watch(function () { return ItineraryService.getItinerary(); }, 
            function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    if (ItineraryService.getItinerary().length > 1) {
                        getNewRoute();
                    }
                }
            }, true
        );
        
        var getNewRoute = function() {
            var itinerary = ItineraryService.getItinerary();
            var urlText = "";
            for(var i=0; i<itinerary.length; i++) {
                urlText += "waypoint" + i + "=" + 
                    itinerary[i].position.lat + "," + itinerary[i].position.lon + 
                    (i != itinerary.length -1 ? "&" : "");
            }
            
            RouteService.get({ mode: $scope.transportationMode, waypoints: urlText }).$promise.then(function(data) {
                MapService.drawRouteInMap(data);
            }).catch(function(error) {
                console.log(error);
            });
        }
    }
]);