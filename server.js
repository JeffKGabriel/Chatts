var io = require('socket.io'),
  connect = require('connect'),
  chatter = require('chatter');

var app = connect().use(connect.static('public')).listen(process.env.PORT || 3000);
var chat_room = io.listen(app);

chat_room.configure( function(){
		chat_room.set("transports",["xhr-polling"]);
		chat_room.set("polling duration",10);
});

chatter.set_sockets(chat_room.sockets);

chat_room.sockets.on('connection', function (socket) {
  chatter.connect_chatter({
    socket: socket,
    username: socket.id
  });
});
