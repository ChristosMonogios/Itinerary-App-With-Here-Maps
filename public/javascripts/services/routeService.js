mapApp.factory("RouteService", function () {
        var currentRoute = "";
        
        return {
            setRoute: function(route) {
                currentRoute = route;
            },
            getRoute: function() {
                return currentRoute;
            }
        }
    });