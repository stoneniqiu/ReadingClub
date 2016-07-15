(function () {
    angular
    .module('readApp')
    .controller('bookDetailCtrl', bookDetailCtrl);
    bookDetailCtrl.$inject = ['$routeParams','booksData', '$modal', 'userData'];
    function bookDetailCtrl($routeParams, booksData, $modal, user) {
        var vm = this;
        var bookid = $routeParams.bookid;
        booksData.getbookById(bookid).success(function(data) {
            vm.book = data;
        }).error(function (e) {
            console.log(e);
            vm.message = "Sorry, something's gone wrong ";
        });
        vm.user = user;
    }
})();