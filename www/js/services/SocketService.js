(function(){

	angular.module('starter')
	.service('SocketService', ['socketFactory', SocketService]);

	function SocketService(socketFactory){
		return socketFactory({

			ioSocket: io.connect('http://q3-socket-server.herokuapp.com')

		});
	}
})();


// https://q3-socket-server.herokuapp.com
