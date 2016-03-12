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
                var view = data.Response.View[0];
                if (!checkIfNoMatchingResultsWasReturned(view)) {
                    console.log("No matching results were returned");
                    return;
                }
                
                var results = view.Result;
                
                if (checkIfOnlyOneResultWasReturned(results)) {
                    ItineraryService.addWaypointToItinerary(results[0]);
                } else {
                    $scope.searchResults = results;
                    $scope.toggleResultsList();
                }
            }).catch(function(error) {
                console.log(error);
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