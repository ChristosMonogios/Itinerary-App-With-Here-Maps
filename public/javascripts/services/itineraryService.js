mapApp.factory("ItineraryService", 
    function () {
        var currentRoute = {};
        var itinerary = [];
                
        return {
            setRoute: function(route) {
                var thinRoute = {
                    place: route.Location.Address.Label,
                    id: route.Location.LocationId,
                    position: {
                        lat: route.Location.DisplayPosition.Latitude,
                        lon: route.Location.DisplayPosition.Longitude
                    }
                };
                
                currentRoute = thinRoute;
            },
            getRoute: function() {
                return currentRoute;
            },
            updateItinerary: function(list) {
                itinerary = list;
            }
        }
    }
);