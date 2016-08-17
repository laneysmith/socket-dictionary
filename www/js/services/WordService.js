angular.module('starter')
  .factory('WordService', ['$http', '$q', function($http, $q) {
    return {
      getWord: function() {
        return $http.get('http://q3-socket-server.herokuapp.com/word').then(function(word) {
          return $q.resolve(word);
        })
      }
    }
  }]);
