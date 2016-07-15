(function () {
    
    angular
    .module('readApp')
    .controller('bookModalCtrl', bookModalCtrl);
    
    bookModalCtrl.$inject = ['$modalInstance', 'viewData','booksData'];
    function bookModalCtrl($modalInstance, viewData, booksData) {
        var vm = this;
        vm.viewData = viewData;
        
        vm.onSubmit = function () {
            vm.formError = "";
            if (!vm.formData.title || !vm.formData.rating || !vm.formData.brief || !vm.formData.info || !vm.formData.ISBN) {
                vm.formError = "请完成所有栏目!";
                return false;
            } else {
                console.log(vm.formData);
                vm.doAddBook(vm.formData);
                return false;
            }
        };
        vm.doAddBook = function (formData) {
            booksData.addBook({                
                title: formData.title,
                info: formData.info,
                ISBN: formData.ISBN,
                brief: formData.brief,
                tags: formData.tags,
                img: formData.img,
                rating: formData.rating,
            }).success(function(data) {
                console.log("success!");
                vm.modal.close(data);
                //alert(1);
            }).error(function(data) {
                vm.formError = "添加失败，请再试一次";
            });
            return false;
        };
        vm.modal = {
            close : function (result) {
                $modalInstance.close(result);
            },
            cancel : function () {
                $modalInstance.dismiss('cancel');
            }
        };

    }

})();