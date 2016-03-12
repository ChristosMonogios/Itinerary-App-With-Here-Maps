mapApp.controller("MapController", ["$rootScope", "$scope", "RouteService", "ItineraryService", "MapService",
    function ($rootScope, $scope, RouteService, ItineraryService, MapService) {
        $scope.transportationMode = "fastest;car";
        $scope.itinerary = [];
        
        MapService.initializeMap();
        
        $scope.$watch(function () { return ItineraryService.getRoute(); }, 
            function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    $scope.itinerary.push(newValue);
                    if ($scope.itinerary.length > 1) {
                        getNewRoute();
                    }
                }
            }, true
        );
        
        var getNewRoute = function() {
            var urlText = "";
            for(var i=0; i<$scope.itinerary.length; i++) {
                urlText += "waypoint" + i + "=" + 
                    $scope.itinerary[i].position.lat + "," + $scope.itinerary[i].position.lon + 
                    (i != $scope.itinerary.length -1 ? "&" : "");
            }
            
            RouteService.get({ mode: $scope.transportationMode, waypoints: urlText }).$promise.then(function(data) {
                MapService.drawRouteInMap(data);
            }).catch(function(error) {
                console.log(error);
            });
        }
    }
]);