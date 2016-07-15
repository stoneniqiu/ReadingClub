angular
.module('readApp')
.service('topicData', topicData)
.service('booksData', booksData)
.service('userData', userData);

topicData.$inject = ['$http'];
function topicData ($http) {
    return $http.get('/api/topics');
};

booksData.$inject = ['$http'];
function booksData($http) {
    var getBooks = $http.get('/api/books');
    var getbookById = function(bookid) {
        return $http.get('/api/book/' + bookid);
    };
    var addBook = function(data) {
        return $http.post("/api/book", data);
    };
    var removeBookById = function(bookid) {
        return $http.delete('/api/book/' + bookid);
    };
    return {
        getBooks: getBooks,
        getbookById: getbookById,
        addBook: addBook,
        removeBookById: removeBookById
    };
};

function userData() {
    return {
        userName: "stoneniqiu",
    };
}