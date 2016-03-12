mapApp.controller("SearchController", ["$rootScope", "$scope", "SearchService", "RouteService",
    function ($rootScope, $scope, SearchService, RouteService) {        
        $scope.search = function () {
            SearchService.get({ searchText: $scope.searchText }, function(data) {
                if (data.Response.View[0].Result.length === 1) {
                    RouteService.setRoute(data.Response.View[0].Result[0]);
                }
                
                console.log(data);
            });   
        };
    }
]);