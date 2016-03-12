mapApp.controller("SearchController", ["$rootScope", "$scope", "SearchService", "ItineraryService",
    function ($rootScope, $scope, SearchService, ItineraryService) {
        $scope.searchResults = [];
        $scope.visible = false;
        $scope.searchText = "";
        
        $scope.toggleResultsList = function() {
            $scope.visible = !$scope.visible;
        };
         
        $scope.search = function() {
            SearchService.get({ searchText: $scope.searchText }).$promise.then(function(data) {
                var result = data.Response.View[0].Result;
                if (checkIfOnlyOneResultWasReturned(result)) {
                    ItineraryService.setRoute(result[0]);
                } else {
                    $scope.searchResults = result;
                    $scope.toggleResultsList();
                }
            }).catch(function(error) {
                console.log(error);
            });   
        };
        
        $scope.selectRow = function(index) {
            ItineraryService.setRoute($scope.searchResults[index]);
            $scope.searchResults = [];
            $scope.toggleResultsList();
        }
        
        function checkIfOnlyOneResultWasReturned(data) {
            return data.length === 1;
        }
    }
]);