mapApp.factory("RouteService", ["$resource", 
    function ($resource) {
        return $resource("https://route.cit.api.here.com/routing/7.2/calculateroute.json?" + 
            ":waypoints&mode=:mode&combineChange=:combineChange&" + 
            "app_id=wLWuweij9RTP8EtgUKYc&app_code=s4gqVLTvBeEDQMiSECS8WQ&routeattributes=shape", {
            mode: encodeURIComponent('@mode'),
            combineChange: encodeURIComponent('@combineChange'),
        });
    }
]);

