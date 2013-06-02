var socketio = require('socket.io');

exports.listen = function(server) {



var	memberID = null;

Members = new Object();

	var io = socketio.listen(server);
	io.set('log level', 1);
	io.sockets.on('connection', function (socket) {
		console.log('connection');
		socket.on('connect', function(data){			
			connect(socket, data);
		});
	});


function connect(socket,data){
data.memberID=randomID();
Members[socket.id]=data;
console.log(Members[socket.id]);

io.sockets.emit('ready', { client: Members[socket.id] });
}
/*
function getUsers(socketID){
	var users = [];

	if(socketID && socketID.length > 0){
		socketsCount = socketID.lenght;
}*/


function randomID(){
		return (((1 + Math.random()) * 0x10000) | 0);
	}

}
