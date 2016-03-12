mapApp.factory("ItineraryService", function () {
        var currentRoute = "";
        var itinerary = [];
        
        return {
            addRoute: function(route) {
                currentRoute = route;
                itinerary.push(route);
            },
            getRoute: function() {
                return currentRoute;
            }
        }
    });