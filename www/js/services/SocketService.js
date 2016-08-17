(function(){

	angular.module('starter')
	.service('SocketService', ['socketFactory', SocketService]);

	function SocketService(socketFactory){
		return socketFactory({

			ioSocket: io.connect('http://10.6.80.130:3000')

		});
	}
})();
