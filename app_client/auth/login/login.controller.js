(function () {
    angular.module('readApp')
        .controller('loginCtrl', loginCtrl);
    loginCtrl.$inject = ['$location', 'authentication'];
    function loginCtrl($location, authentication) {
        var vm = this;
        vm.credentials = {
            email: '',
            password: ''
        };
        
        vm.returnPage = $location.search().page || '/';
        vm.onSubmit = function () {
            vm.formError = "";
            if (!vm.credentials.email || !vm.credentials.password) {
                vm.formError = "请输入邮箱和密码!";
                return false;
            } else {
                vm.doLogin();
            }
        };
        vm.doLogin = function () {
            vm.formError = "";
            authentication.login(vm.credentials).error(function (err) {
                vm.formError = err.message;
            }).then(function () {
                $location.search('page', null);
                $location.path(vm.returnPage);
            });
        };
    }

})();