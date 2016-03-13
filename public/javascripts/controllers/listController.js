mapApp.controller("ListController", ["$scope", "$sce", "ItineraryService",
    function ($scope, $sce, ItineraryService) {
        $scope.indexOfSelectedRow = null;
        $scope.itineraryList = [];
        $scope.transportationModes = ItineraryService.getTransportationModes();
        $scope.currentTransportationMode = ItineraryService.getTransportationMode();
        $scope.summaryText = "";
        
        $scope.$watch("currentTransportationMode", 
            function (newValue, oldValue) {
                if (newValue.mode !== oldValue.mode) {
                    ItineraryService.setTransportationMode(newValue);
                }
            }, true
        ); 
        
        $scope.$watchCollection(function () { return ItineraryService.getItinerary(); }, 
            function (newItinerary, oldItinerary) {
                $scope.itineraryList = newItinerary;
            }
        );

        $scope.$watch(function () { return ItineraryService.getSummaryText(); }, 
            function (newSummaryText, oldSummaryText) {
                if (newSummaryText !== oldSummaryText) {
                    $scope.summaryText = $sce.trustAsHtml(newSummaryText);
                }
            }
        );       

        $scope.selectRow = function(index) {
            if (!index && typeof index !== "number") {
                index = 0;
            }
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