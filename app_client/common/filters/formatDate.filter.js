angular
.module('readApp')
.filter('formatDate', formatDate);

function formatDate() {
    return function (dateStr) {
        var date = new Date(dateStr);
        var d = date.getDate();
        var monthNames = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
        var m = monthNames[date.getMonth()];
        var y = date.getFullYear();
        var output = y + '/' + m + '/' + d;
        return output;
    };
};
