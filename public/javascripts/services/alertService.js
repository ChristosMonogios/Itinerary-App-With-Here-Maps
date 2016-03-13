mapApp.factory("AlertService", ["$rootScope",
    function ($rootScope) {
        $rootScope.alert = {};
                
        return {
           addAlert: function(type, message) {
               $rootScope.alert = {
                   type: type,
                   message: message
               };
           },
           closeArert: function() {
               $rootScope.alert = {};
           }
        }
    }
]);