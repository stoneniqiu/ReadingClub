angular.module('myApp', []);
angular.module('myApp').controller('myController', myController);
function myController($scope) {
    $scope.items = ["one", "two", "three"];
};
