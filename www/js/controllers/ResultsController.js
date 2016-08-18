(function() {
  angular.module('starter')
    .controller('ResultsController', ['$scope', '$state', 'localStorageService', 'SocketService', 'moment', '$ionicHistory', '$ionicScrollDelegate', 'WordService', ResultsController]);

  function ResultsController($scope, $state, localStorageService, SocketService, moment, $ionicHistory, $ionicScrollDelegate, WordService) {
    $scope.score = localStorageService.get('player_data.score');
    $scope.name = localStorageService.get('username');

    $scope.nextRound = function() {
        // $ionicHistory.goBack(-1);
        $state.go('rooms');
    }
  }

})();
