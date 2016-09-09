(function () {
    angular
.module('readApp')
.directive('navigation', navigation);   
    function navigation() {
        return {
            restrict: 'EA',
            templateUrl: '/common/directive/navigation/navigation.html',
            controller: 'navigationCtrl as navvm'
        };
    }
})();


