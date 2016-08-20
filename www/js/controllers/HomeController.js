(function() {
	angular.module('starter')
		.controller('HomeController', ['$scope', '$state', 'localStorageService', 'SocketService', HomeController]);

	function HomeController($scope, $state, localStorageService, SocketService) {

		var me = this;

		me.current_room = localStorageService.get('room');
		me.username = '';
		// ["Pikachu", "Pacman", "Mortal Kombat", "Banana Room"]

		SocketService.on('update:rooms', function(allGames) {
      console.log(allGames);
			me.rooms = allGames;
		})


		$scope.login = function(username) {
			me.username = username;
			$state.go('rooms');
		};

		$scope.enterRoom = function(room, username) {
			me.current_room = room;
			SocketService.emit('join:room', room, username);
			$state.go('room.mainGame');
		};

	}

})();
