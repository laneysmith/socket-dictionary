(function() {
  angular.module('starter')
    .controller('RoomController', ['$scope', '$state', 'localStorageService', 'SocketService', 'moment', '$ionicScrollDelegate', 'WordService', RoomController]);

  function RoomController($scope, $state, localStorageService, SocketService, moment, $ionicScrollDelegate, WordService) {

    var me = this;

    me.messages = [];
    me.definitions = [];
    console.log(me.definitions.length);


    $scope.humanize = function(timestamp) {
      return moment(timestamp).fromNow();
    };

    me.current_room = localStorageService.get('room');

    var current_user = localStorageService.get('username');

    $scope.isNotCurrentUser = function(user) {

      if (current_user != user) {
        return 'not-current-user';
      }
      return 'current-user';
    };
    $scope.selectWord = function() {
      SocketService.emit('select_word', $scope.data.word, me.current_room);
    };

    $scope.getWord = function() {
      return WordService.getWord().then(function(word) {
        $scope.data = word.data
      })
    }

    // $scope.sendTextMessage = function() {
    //
    //   var msg = {
    //     'room': me.current_room,
    //     'user': current_user,
    //     'text': me.message,
    //     'time': moment()
    //   };
    //
    //   me.messages.push(msg);
    //   $ionicScrollDelegate.scrollBottom();
    //
    //   me.message = '';
    //
    //   SocketService.emit('send:message', msg);
    // };

    $scope.sendDefinition = function () {
      $scope.toggleInput = false;

      var def = {
        'room': me.current_room,
        'user': current_user,
        'definition': me.definition
      };

      SocketService.emit('send:definition', def);


    }

    $scope.leaveRoom = function() {

      var msg = {
        'user': current_user,
        'room': me.current_room,
        'time': moment()
      };

      SocketService.emit('leave:room', msg);
      $state.go('rooms');

    };

    localStorageService.set('player_data.score', 0);
    localStorageService.set('player_data.currentRole', "player");

    SocketService.on('selected_word', function(word) {
      $scope.toggleInput = true;
      $scope.word = word;
    })

    SocketService.on('start_game', function(msg) {
      WordService.getWord().then(function(data) {
        $scope.data = data.data;
      })
      $scope.currentRole = localStorageService.get('player_data.currentRole');
    });

    SocketService.on('first_player', function(msg) {
      localStorageService.set('player_data.currentRole', "picker");
    });

    SocketService.on('message', function(msg) {
      me.messages.push(msg);
      $ionicScrollDelegate.scrollBottom();
    });

    SocketService.on('definition', function(def) {
      console.log(def);
      me.definitions.push(def);
    });


  }

})();
