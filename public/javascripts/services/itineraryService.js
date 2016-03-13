mapApp.factory("ItineraryService", 
    function () {
        var currentRoute = {};
        var itinerary = [];
        var transportationModes = [
            { type: "Car", mode: "fastest;car", combineChange: "" },
            { type: "Public transportation", mode: "fastest;publicTransport", combineChange: true },
            { type: "On feet", mode: "fastest;pedestrian", combineChange: "" }
        ];
        var currentTransportationMode = transportationModes[0];
        
        function checkIfWaypointIsNotInItinerary(currentWaypointId) {
            var itineraryLength = itinerary.length;
            
            for (var i=0; i<itineraryLength; i++) {
                if (currentWaypointId === itinerary[i].id) {
                    return false;
                }
            }
            return true;
        }
                
        return {
            addWaypointToItinerary: function(route) {
                var thinRoute = {
                    place: route.Location.Address.Label,
                    id: route.Location.LocationId,
                    position: {
                        lat: route.Location.DisplayPosition.Latitude,
                        lon: route.Location.DisplayPosition.Longitude
                    }
                };
                
                if (checkIfWaypointIsNotInItinerary(thinRoute.id)) {
                    currentRoute = thinRoute;
                    itinerary.push(thinRoute);                   
                } else {
                    throw new Error("This place is already added to your list!");
                }
            },
            changeOrderOfWaypointsInItinerary: function(direction, index) {
                var temp = itinerary[index];
                
                if (direction === "up") {
                    if (index === 0) {
                        return itinerary;
                    }
                    
                    itinerary[index] = itinerary[index - 1];
                    itinerary[index - 1] = temp;
                } else if (direction === "down") {
                    if (index === itinerary.length - 1) {
                        return itinerary;
                    }
                        
                    itinerary[index] = itinerary[index + 1];
                    itinerary[index + 1] = temp;                    
                }
                
                return itinerary;
            },
            removeWaypointFromItinerary: function(index) {
                if (index != null) {
                    itinerary.splice(index, 1);
                    return itinerary;
                }
            },
            getItinerary: function() {
                return itinerary;
            },
            setTransportationMode: function(mode) {
                currentTransportationMode = mode;
            },
            getTransportationMode: function() {
                return currentTransportationMode;
            },
            getTransportationModes: function() {
                return transportationModes;
            }
        }
    }
);