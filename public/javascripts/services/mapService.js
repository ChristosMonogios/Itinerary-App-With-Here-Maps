mapApp.factory("MapService",
    function () {
        var map = null,
            router = null;
        
        return {
            initializeMap: function() {
                var platform = new H.service.Platform({
                    app_id: 'wLWuweij9RTP8EtgUKYc',
                    app_code: 's4gqVLTvBeEDQMiSECS8WQ',
                    useCIT: true,
                    useHTTPS: false
                });
                
                var defaultLayers = platform.createDefaultLayers();
                
                map = new H.Map(document.getElementById('map'),
                    defaultLayers.normal.map,{
                    center: {lat:52, lng:5},
                    zoom: 5
                });
                
                var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
                
                var ui = H.ui.UI.createDefault(map, defaultLayers);
            },
            drawRouteInMap: function(data) {
                var route,
                    routeShape,
                    startPoint,
                    endPoint,
                    strip;
                    
                if(data.response.route) {
                    route = data.response.route[0];
                    routeShape = route.shape;
                    strip = new H.geo.Strip();

                    routeShape.forEach(function(point) {
                        var parts = point.split(',');
                        strip.pushLatLngAlt(parts[0], parts[1]);
                    });

                    var markers = [];
                    for (var i=0; i<route.waypoint.length; i++) {
                        markers[i] = route.waypoint[i].mappedPosition;
                    }
                    

                    var routeLine = new H.map.Polyline(strip, {
                    style: { strokeColor: 'blue', lineWidth: 4 }
                    });

                    map.addObject(routeLine);
                    
                    for (var i=0; i<markers.length; i++) {
                        map.addObject(new H.map.Marker({
                    lat: markers[i].latitude,
                    lng: markers[i].longitude
                    }));
                    }
                    map.setViewBounds(routeLine.getBounds());
                } else {
                    alert('NO ROUTE FOUND');
                }                
            }         
        }
    }
);