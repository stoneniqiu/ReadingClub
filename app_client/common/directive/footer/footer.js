(function () {
    angular
.module('readApp')
.directive('footerNav', footerNav);
    
    function footerNav() {
        return {
            restrict: 'EA',
            templateUrl: '/common/directive/footer/footer.html'
        };
    }
})();