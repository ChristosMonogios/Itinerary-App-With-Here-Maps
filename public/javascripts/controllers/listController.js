mapApp.controller("ListController", ["$rootScope", "$scope", "RouteService",
    function ($rootScope, $scope, RouteService) {
        $scope.indexOfSelectedRow = null;
        $scope.itinerary = [];
        
        $scope.$watch(function () { return RouteService.getRoute(); }, 
            function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    $scope.addRow(newValue.Location.Address.Label);
                }
            }, true
        );       
        
        $scope.addRow = function(waypoint) {
            $scope.itinerary.push(waypoint);
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
        };        

        $scope.moveRowDown = function() {
            if ($scope.indexOfSelectedRow === $scope.itinerary.length - 1) {
                return;
            }
                
            var temp = $scope.itinerary[$scope.indexOfSelectedRow];
            $scope.itinerary[$scope.indexOfSelectedRow] = $scope.itinerary[$scope.indexOfSelectedRow + 1];
            $scope.itinerary[$scope.indexOfSelectedRow + 1] = temp;
            $scope.indexOfSelectedRow++;
        };
        
        $scope.removeRow = function() {
            $scope.itinerary.splice($scope.indexOfSelectedRow, 1);
        };
    }
]);