mapApp.factory("SearchService", ["$resource", 
    function ($resource) {
        return $resource("https://geocoder.cit.api.here.com/6.2/geocode.json?" +
            "searchtext=:searchText&app_id=wLWuweij9RTP8EtgUKYc&app_code=s4gqVLTvBeEDQMiSECS8WQ&gen=100");
    }
]);