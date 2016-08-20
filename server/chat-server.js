var io = require('socket.io')(3000);

var allGames = {
	'Pikachu': {
		round: 1,
		capacity: 4,
		players: [{
			username: 'lucas',
			socket: '123def',
			currentRole: 'picker',
			submissionThisRound: 'blah',
			scoreThisRound: 0
		}, {
			username: 'will',
			socket: '456abc',
			currentRole: 'player',
			submissionThisRound: 'blah',
			scoreThisRound: 0
		}, {
			username: 'evan',
			socket: 'wyxs',
			currentRole: 'player',
			submissionThisRound: 'blah',
			scoreThisRound: 0
		}],
		submissionCounter: 0,
		voteCounter: 0
	},
	'Pacman': {
		round: 1,
		capacity: 4,
		players: [],
		submissionCounter: 0,
		voteCounter: 0
	},
	'Mortal Kombat': {
		round: 1,
		capacity: 4,
		players: [],
		submissionCounter: 0,
		voteCounter: 0
	},
	'Banana Room': {
		round: 1,
		capacity: 4,
		players: [],
		submissionCounter: 0,
		voteCounter: 0
	},
}


io.on('connection', function(socket) {
  
  console.log('connection');
  console.log(allGames);
  io.emit('update:rooms', allGames)

	socket.on('join:room', function(room, username) {
		socket.join(room, username);
    var playerCount = io.sockets.adapter.rooms[room].length
    var playerCapacity = allGames[room].capacity
		if (playerCount === 1) {
      allGames[room].players.push({
        username: username,
        socket: socket.id,
        currentRole: 'picker',
        scoreThisRound: 0
      })
			io.in(socket.id).emit('first_player', "first_player");
		} else if (playerCount === 4) {
      allGames[room].players.push({
        username: username,
        socket: socket.id,
        currentRole: 'player',
        scoreThisRound: 0
      })
			io.in(room_name).emit('start_game', "starting game....");
		}
	});

	socket.on('select_word', function(data, room_name) {
		io.in(room_name).emit('selected_word', data)
	});

	socket.on('leave:room', function(msg) {
		msg.text = msg.user + ' has left the room';
		socket.leave(msg.room);
		socket.in(msg.room).emit('message', msg);
	});

	socket.on('send:message', function(msg) {
		socket.in(msg.room).emit('message', msg);
	});

	socket.on('send:definition', function(def) {
		io.in(def.room).emit('definition', def);
	});

	socket.on('updateScore', function(choice, room) {
		console.log(choice);
		io.in(room).emit('updateScore', choice)
	})
});
