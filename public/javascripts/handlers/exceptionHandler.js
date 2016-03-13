mapApp.factory('$exceptionHandler', ["$injector",
    function($injector) {
        return function(exception, cause) {
            $injector.get("AlertService").addAlert("danger", exception.message);
        };
    }
]);