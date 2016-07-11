angular
.module('readApp')
.directive('ratingStars', ratingStars);

function ratingStars() {
    return {
        restrict: 'EA',
        scope: {
            thisRating : '=rating'
        },
        templateUrl: '/common/directive/ratingStars/ratingStars.template.html'
    };
}