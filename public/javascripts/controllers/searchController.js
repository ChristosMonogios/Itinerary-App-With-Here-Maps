mapApp.controller("SearchController", ["$scope", "SearchService", "ItineraryService",
    function ($scope, SearchService, ItineraryService) {
        $scope.searchResults = [];
        $scope.isResultsListVisible = false;
        $scope.searchText = "";
        
        $scope.toggleResultsList = function() {
            $scope.isResultsListVisible = !$scope.isResultsListVisible;
        };
         
        $scope.search = function() {
            SearchService.get({ searchText: $scope.searchText }).$promise.then(function(data) {
                var view = data.Response.View[0];
                if (!checkIfNoMatchingResultsWasReturned(view)) {
                    throw new Error("No matching results were returned!");
                }
                
                var results = view.Result;
                
                if (checkIfOnlyOneResultWasReturned(results)) {
                    if ($scope.isResultsListVisible) {
                        $scope.toggleResultsList();
                    }
                    
                    ItineraryService.addWaypointToItinerary(results[0]);
                } else {
                    $scope.searchResults = results;
                    $scope.toggleResultsList();
                }
            }).catch(function(error) {
                throw new Error(error.message);
            });   
        };
        
        $scope.selectRow = function(index) {
            ItineraryService.addWaypointToItinerary($scope.searchResults[index]);
            $scope.searchResults = [];
            $scope.toggleResultsList();
        }
        
        function checkIfOnlyOneResultWasReturned(data) {
            return data.length === 1;
        }
        
        function checkIfNoMatchingResultsWasReturned(data) {
            return data;
        }
    }
]);