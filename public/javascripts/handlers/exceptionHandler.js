mapApp.factory('$exceptionHandler', ["$injector",
    function($injector) {
        return function(exception, cause) {
            console.log(exception);
            $injector.get("AlertService").addAlert("danger", exception.message);
        };
    }
]);