(function(){

	angular.module('starter')
	.service('SocketService', ['socketFactory', SocketService]);

	function SocketService(socketFactory){
		return socketFactory({

<<<<<<< HEAD
			ioSocket: io.connect('http://10.6.82.246:3000')
=======
			ioSocket: io.connect('http://localhost:3000')
>>>>>>> 60573b29f2b666d6feb92dc1fdbe2259fc26d455

		});
	}
})();
