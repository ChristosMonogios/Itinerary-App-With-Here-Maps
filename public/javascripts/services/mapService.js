mapApp.factory("MapService",
    function () {
        var map = null;
        
        var platform = new H.service.Platform({
            app_id: "wLWuweij9RTP8EtgUKYc",
            app_code: "s4gqVLTvBeEDQMiSECS8WQ",
            useCIT: true,
            useHTTPS: false
        });
        
        var defaultLayers = platform.createDefaultLayers();        
        
        return {
            initializeMap: function() {
                var mapDiv = document.getElementById("map");
                mapDiv.innerHTML = ""; // HACK: How can I update the map with HERE properties?
                
                map = new H.Map(mapDiv,
                    defaultLayers.normal.map, {
                    center: {
                        lat: 52, 
                        lng: 5
                        },
                    zoom: 5
                });
                
                var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
                var ui = H.ui.UI.createDefault(map, defaultLayers);
            },
            
            drawRouteInMap: function(data) {
                var route,
                    routeShape,
                    strip,
                    markers;
                    
                if(data.response.route) {
                    route = data.response.route[0];
                    routeShape = route.shape;
                    strip = new H.geo.Strip();

                    routeShape.forEach(function(point) {
                        var parts = point.split(',');
                        strip.pushLatLngAlt(parts[0], parts[1]);
                    });

                    markers = [];
                    for (var i=0; i<route.waypoint.length; i++) {
                        markers[i] = route.waypoint[i].mappedPosition;
                    }
                    
                    var routeLine = new H.map.Polyline(strip, {
                        style: { 
                            strokeColor: 'blue', 
                            lineWidth: 4 
                            }
                    });

                    this.initializeMap();
                    map.addObject(routeLine);
                    
                    for (var i=0; i<markers.length; i++) {
                        map.addObject(new H.map.Marker({
                            lat: markers[i].latitude,
                            lng: markers[i].longitude
                        }));
                    }
                    map.setViewBounds(routeLine.getBounds());
                } else {
                    console.log("no route found.");
                }                
            }         
        }
    }
);