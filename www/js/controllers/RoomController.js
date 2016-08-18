(function() {
  angular.module('starter')
    .controller('RoomController', ['$scope', '$state', 'localStorageService', 'SocketService', 'moment', '$ionicScrollDelegate', 'WordService', RoomController]);

  function RoomController($scope, $state, localStorageService, SocketService, moment, $ionicScrollDelegate, WordService) {

    var me = this;

    me.messages = [];
    me.definitions = [];
    me.scores = [];
    $scope.score = 0;
    $scope.view = {
      choice: 'test'
    }
    $scope.waiting = true;
    me.results = [];

    // $scope.view.choice = 'test'

    $scope.selected = true;
    $scope.humanize = function(timestamp) {
      return moment(timestamp).fromNow();
    };

    me.current_room = localStorageService.get('room');

    var current_user = localStorageService.get('username');
    $scope.user = current_user

    $scope.isNotCurrentUser = function(user) {

      if (current_user != user) {
        return 'not-current-user';
      }
      return 'current-user';
    };
    $scope.selectWord = function() {
      SocketService.emit('select_word', $scope.data, me.current_room);
      $scope.selected = false;
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

    $scope.sendDefinition = function() {
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

    SocketService.on('selected_word', function(data) {
      var def = {
        definition: data.meaning,
        word: data.word
      }
      me.definitions.push(def)
      $scope.toggleInput = true;
      $scope.word = data.word;
    })

    SocketService.on('start_game', function(msg) {
      WordService.getWord().then(function(data) {
        $scope.data = data.data;
      })
      $scope.waiting = false;
      $scope.currentRole = localStorageService.get('player_data.currentRole');
    });

    SocketService.on('first_player', function(msg) {
      localStorageService.set('player_data.currentRole', "picker");
    });

    SocketService.on('message', function(msg) {
      me.messages.push(msg);
      $ionicScrollDelegate.scrollBottom();
    });

    SocketService.on('room_full', function(msg) {
      alert(msg);
      $state.go('rooms');
    })

    SocketService.on('definition', function(def) {
      me.definitions.push(def);
    });

    // ******************************************************
    $scope.playerChoice = function(choice) {
      SocketService.emit('sendChoice', choice, me.current_room)
      $scope.choiceMade = true;
    }

    SocketService.on(current_user, function(msg) {
      $scope.score++;
      localStorageService.set('player_data.score', $scope.score);
    })
  }

})();
