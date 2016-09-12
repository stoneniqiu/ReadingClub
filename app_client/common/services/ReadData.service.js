angular
.module('readApp')
.service('topicData', topicData)
.service('booksData', booksData)
.service('userData', userData);

topicData.$inject = ['$http'];
function topicData ($http) {
    return $http.get('/api/topics');
};

booksData.$inject = ['$http','authentication'];
function booksData($http,authentication) {
    var getBooks = $http.get('/api/books');
    var getbookById = function(bookid) {
        return $http.get('/api/book/' + bookid);
    };
    var addBook = function(data) {
        return $http.post("/api/book", data, {
            headers: {
                Authorization: 'Bearer ' + authentication.getToken()
            }
        });
    };
    var removeBookById = function(bookid) {
        return $http.delete('/api/book/' + bookid, {
            Authorization: 'Bearer ' + authentication.getToken()
        });
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