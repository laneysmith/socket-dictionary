var io = require('socket.io')(3000);



io.on('connection', function(socket) {

  socket.on('join:room', function(data) {
    socket.join(room_name);
    console.log('allData', data)
    console.log('allGames', allGames)
    console.log('data', io.sockets.adapter.rooms[room_name])
    if (io.sockets.adapter.rooms[room_name].length === 1) {
      io.in(socket.id).emit('first_player', "first_player");
    }
    if (io.sockets.adapter.rooms[room_name].length === 4) {
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
    console.log(def);
    io.in(def.room).emit('definition', def);
  });

	socket.on('updateChoice', function(choice, room){
		console.log('choice', choice)
		io.in(room).emit('updateChoice', choice)
	})
});
