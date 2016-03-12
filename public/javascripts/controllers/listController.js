mapApp.controller("ListController", ["$rootScope", "$scope", "ItineraryService",
    function ($rootScope, $scope, ItineraryService) {
        $scope.indexOfSelectedRow = null;
        $scope.itineraryList = [];
        
        $scope.$watch(function () { return ItineraryService.getRoute(); }, 
            function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    $scope.addRowInTheList(newValue);
                }
            }, true
        );       
        
        $scope.addRowInTheList = function(waypoint) {
            $scope.itineraryList.push(waypoint);
        };
        
        $scope.selectRow = function(index) {
            $scope.indexOfSelectedRow = index;
        };

        $scope.moveRowUp = function() {
            $scope.itineraryList = ItineraryService.changeOrderOfWaypointsInItinerary("up", $scope.indexOfSelectedRow);
            $scope.indexOfSelectedRow--;
        };        

        $scope.moveRowDown = function() {
            $scope.itineraryList = ItineraryService.changeOrderOfWaypointsInItinerary("down", $scope.indexOfSelectedRow);
            $scope.indexOfSelectedRow++;
        };
        
        $scope.removeRow = function() {
            $scope.itineraryList = ItineraryService.removeWaypointFromItinerary($scope.indexOfSelectedRow);
        };
    }
]);