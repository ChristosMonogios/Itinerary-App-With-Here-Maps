mapApp.factory("ItineraryService", 
    function () {
        var currentRoute = {};
        var itinerary = [];
                
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
                
                currentRoute = thinRoute;
                itinerary.push(thinRoute);
            },
            getRoute: function() {
                return currentRoute;
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
            }
        }
    }
);