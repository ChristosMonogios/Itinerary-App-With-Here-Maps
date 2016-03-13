describe("Service: ItineraryService", function() {
    var itineraryService;
    
    beforeEach(module("map-app"));
  
    beforeEach(inject(function($injector) {
        itineraryService = $injector.get("ItineraryService");
        
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
    }));
    
    it("should not remove any route, since the index is wrong", function() {
        itineraryService.removeWaypointFromItinerary(6);
        expect(itineraryService.getItinerary().length).toEqual(2);
    });
    
    it("should change the order of the second with the first route", function() {
        itineraryService.changeOrderOfWaypointsInItinerary("up", 1);
        expect(itineraryService.getItinerary()[0].id).toEqual("NT_f6msIgQMSfGdaLF.tsj6FC");
    });
    
    it("should change the order of the first with the second route", function() {
        itineraryService.changeOrderOfWaypointsInItinerary("down", 0);
        expect(itineraryService.getItinerary()[0].id).toEqual("NT_f6msIgQMSfGdaLF.tsj6FC");
    });
    
    it("should not change the order of the routes", function() {
        itineraryService.changeOrderOfWaypointsInItinerary("up", 0);
        expect(itineraryService.getItinerary()[1].id).toEqual("NT_f6msIgQMSfGdaLF.tsj6FC");
    });
    
    it("should not change the order of the routes 2", function() {
        itineraryService.changeOrderOfWaypointsInItinerary("down", 2);
        expect(itineraryService.getItinerary()[1].id).toEqual("NT_f6msIgQMSfGdaLF.tsj6FC");
    });
    
    it("should not change the order of the routes 3", function() {
        itineraryService.changeOrderOfWaypointsInItinerary("downnnn", 0);
        expect(itineraryService.getItinerary()[1].id).toEqual("NT_f6msIgQMSfGdaLF.tsj6FC");
    });
    
    it("should throw an exception because index is null", function() {
        expect( function(){ itineraryService.changeOrderOfWaypointsInItinerary("down", null); } )
            .toThrow(new Error("The specified key is wrong. Please try again"));
    });
    
    it("should throw an exception because index is undefined", function() {
        expect( function(){ itineraryService.changeOrderOfWaypointsInItinerary("down", undefined); } )
            .toThrow(new Error("The specified key is wrong. Please try again"));
    });
    
    it("should throw an exception when trying to remove a route because index is null", function() {
        expect( function(){ itineraryService.removeWaypointFromItinerary(null); } )
            .toThrow(new Error("The specified key is wrong. Please try again"));
    });
    
    it("should throw an exception when trying to add a route that is already in itirenary", function() {
        expect( function(){ itineraryService.addWaypointToItinerary({
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
            }).toThrow(new Error("This place is already added to your list!"));
    });
        
    it("should remove the first route", function() {
        itineraryService.removeWaypointFromItinerary(0);
        expect(itineraryService.getItinerary().length).toEqual(1);
    });
});