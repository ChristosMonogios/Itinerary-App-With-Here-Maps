describe("Controller: ListController", function() {
    var scope, itineraryService;
    
    beforeEach(module("map-app"));   
    
    beforeEach(inject(function($injector) {
        itineraryService = $injector.get("ItineraryService");
        

    }));
      
    beforeEach(inject(function($controller, $rootScope, $sce) {
        scope = $rootScope.$new();

        $controller("ListController", {$scope: scope, $sce: $sce, ItineraryService: itineraryService });
        
        itineraryService.addWaypointToItinerary({
            Location: {
                Address: {
                    Label: "Berlin, Deutschland"
                },
                LocationId: "NT_DKX2wfaWICS7JyfHmCOJhB",
                DisplayPosition: {
                    Latitude: 52.51607,
                    Longitude: 13.37699
                }
            }
        });
            
        itineraryService.addWaypointToItinerary({
            Location: { 
                Address: {
                    Label: "Roma, Lazio, Italia"
                },
                LocationId: "NT_f6msIgQMSfGdaLF.tsj6FC",
                DisplayPosition: {
                    Latitude: 41.90323,
                    Longitude: 12.49566
                } 
            }
         });
        scope.$digest(); 
    }));
  
    it("should contain the same number of elements as the array in service", function() {
        expect(scope.itineraryList.length).toEqual(2);
    });
    
    it("should select the first row of the list", function() {
        scope.selectRow(0);
        expect(scope.indexOfSelectedRow).toEqual(0);
    });
    
    it("should select the first row as default when index is null", function() {
        scope.selectRow(null);
        expect(scope.indexOfSelectedRow).toEqual(0);
    });
    
    it("should select the first row as default when index is undefined", function() {
        scope.selectRow(undefined);
        expect(scope.indexOfSelectedRow).toEqual(0);
    });
    
    it("should change the order of the elements in the list when up button is clicked", function() {
        scope.indexOfSelectedRow = 1;
        scope.moveRowUp();
        expect(scope.itineraryList[0].id).toEqual("NT_f6msIgQMSfGdaLF.tsj6FC");
    });
    
    it("should decrease the index when the order of the list is changed", function() {
        scope.indexOfSelectedRow = 1;
        scope.moveRowUp();
        expect(scope.indexOfSelectedRow).toEqual(0);
    });
    
    it("should change the order of the elements in the list when down button is clicked", function() {
        scope.indexOfSelectedRow = 0;
        scope.moveRowDown();
        expect(scope.itineraryList[0].id).toEqual("NT_f6msIgQMSfGdaLF.tsj6FC");
    });
    
    it("should remove one element of the itinerary and update the list", function() {
        scope.indexOfSelectedRow = 0;
        scope.removeRow();
        expect(scope.itineraryList[0].id).toEqual("NT_f6msIgQMSfGdaLF.tsj6FC");
    });

    it("should update the mode in the service when it is changed from user", function() {
        scope.currentTransportationMode = { type: "On feet", mode: "fastest;pedestrian", combineChange: "" };
        scope.$digest(); // run watch implicitly
        expect(itineraryService.getTransportationMode().mode).toEqual("fastest;pedestrian");
    });
    
    it("should update the summary text when the text is changed on the service", function() {
        itineraryService.setSummaryText("Christos Monogios");
        scope.$digest(); // run watch implicitly
        expect(scope.summaryText.toString()).toEqual("Christos Monogios"); 
    });
});