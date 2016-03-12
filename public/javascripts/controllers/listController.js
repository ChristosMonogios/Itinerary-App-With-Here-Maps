mapApp.controller('ListController', ['$rootScope', '$scope',
    function ($rootScope, $scope) {
        $scope.indexOfSelectedRow = null;
        $scope.itinerary = ['Athens', 'Paris', 'Berlin', 'Helsikni'];
        
        $scope.selectRow = function(index) {
            $scope.indexOfSelectedRow = index;
        }

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
        }
    }
]);