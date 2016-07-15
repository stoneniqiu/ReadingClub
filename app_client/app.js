(function() {
    angular.module('readApp', ['ngRoute', 'ngSanitize', 'ui.bootstrap']);
    
    function config($routeProvider, $locationProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'home/home.view.html',
            controller: 'homeCtrl',
            controllerAs: 'vm'
        }).when('/about', {
            templateUrl: 'about/about.html',
            controller: 'aboutCtrl',
            caseInsensitiveMatch: true,
            controllerAs: 'vm'
        })
        .when('/books', {
            templateUrl: 'books/books.html',
            controller: 'booksCtrl',
            caseInsensitiveMatch: true,
            controllerAs: 'vm'
        })
        .when('/book/:bookid', {
            templateUrl: 'bookDetail/bookDetail.html',
            controller: 'bookDetailCtrl',
            caseInsensitiveMatch: true,
            controllerAs: 'vm'
        })
        .otherwise({ redirectTo: '/' });
        
         $locationProvider.html5Mode(true);
    }
    angular
.module('readApp')
.config(['$routeProvider', '$locationProvider', config]);
}
)();
