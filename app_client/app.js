(function() {
    angular.module('readApp', ['ngRoute']);
    
    function config($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'home/home.view.html',
            controller: 'homeCtrl',
            controllerAs: 'vm'
        })
        .otherwise({ redirectTo: '/' });
    }
    angular
.module('readApp')
.config(['$routeProvider', config]);
}
)();
