mapApp.controller("ListController", ["$rootScope", "$scope", "ItineraryService",
    function ($rootScope, $scope, ItineraryService) {
        $scope.indexOfSelectedRow = null;
        $scope.itinerary = [];
        
        $scope.$watch(function () { return ItineraryService.getRoute(); }, 
            function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    $scope.addRow(newValue);
                }
            }, true
        );       
        
        $scope.addRow = function(waypoint) {
            $scope.itinerary.push(waypoint);
            ItineraryService.updateItinerary($scope.itinerary);
        };
        
        $scope.selectRow = function(index) {
            $scope.indexOfSelectedRow = index;
        };

        $scope.moveRowUp = function() {
            if ($scope.indexOfSelectedRow === 0) {
                return;
            }
            
            var temp = $scope.itinerary[$scope.indexOfSelectedRow];
            $scope.itinerary[$scope.indexOfSelectedRow] = $scope.itinerary[$scope.indexOfSelectedRow - 1];
            $scope.itinerary[$scope.indexOfSelectedRow - 1] = temp;
            $scope.indexOfSelectedRow--;
            
            ItineraryService.updateItinerary($scope.itinerary);
        };        

        $scope.moveRowDown = function() {
            if ($scope.indexOfSelectedRow === $scope.itinerary.length - 1) {
                return;
            }
                
            var temp = $scope.itinerary[$scope.indexOfSelectedRow];
            $scope.itinerary[$scope.indexOfSelectedRow] = $scope.itinerary[$scope.indexOfSelectedRow + 1];
            $scope.itinerary[$scope.indexOfSelectedRow + 1] = temp;
            $scope.indexOfSelectedRow++;
            
            ItineraryService.updateItinerary($scope.itinerary);
        };
        
        $scope.removeRow = function() {
            if ($scope.indexOfSelectedRow != null) {
                $scope.itinerary.splice($scope.indexOfSelectedRow, 1);
                ItineraryService.updateItinerary($scope.itinerary);
            }
        };
    }
]);