angular.module('myApp', []);

//function myController($scope) {
//    $scope.items = ["one", "two", "three"];
//};
var myController = function ($scope) {
    $scope.myInput = "Angular!";
};

angular.module('myApp').controller('myController', myController);
