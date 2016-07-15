angular
.module('readApp')
.controller('homeCtrl', homeCtrl);

 
homeCtrl.$inject = ['topicData','userData'];
function homeCtrl(topicData,user) {
    var vm = this;
    vm.message = "loading...";
    topicData.success(function (data) {
        vm.message = data.length > 0 ? "" : "暂无数据";
        vm.data = data;
    }).error(function (e) {
        console.log(e);
        vm.message = "Sorry, something's gone wrong ";
    });
    vm.user = user;
}
