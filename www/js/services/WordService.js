angular.module('starter')
  .factory('WordService', ['$http', '$q', function($https, $q) {
    return {
      getWord: function() {
        return $https.get('https://q3-socket-server.herokuapp.com/word').then(function(word) {
          var def = word.data.meaning;
          var re = /\).*\(*/;
          var found = def.match(re)[0]
          found = found.replace(/\)|\(/g, '').trim();
          found = found.split(';');
          word.data.meaning = found[0];
          return $q.resolve(word);
        })
      }
    }
  }]);
