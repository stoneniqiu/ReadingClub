angular
.module('readApp')
.service('topicData', topicData);

topicData.$inject = ['$http'];
function topicData ($http) {
    return $http.get('/api/topics');
};