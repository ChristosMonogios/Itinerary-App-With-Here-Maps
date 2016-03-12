mapApp.controller('SearchController', ['$rootScope', '$scope', 'SearchService',
    function ($rootScope, $scope, SearchService) {        
        $scope.search = function () {
            SearchService.get({ searchText: $scope.searchText }, function(data) {
                console.log(data);
            });   
        };
    }
]);