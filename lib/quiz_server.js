var socketio = require('socket.io');

exports.listen = function(server) {

var mongo = require('mongodb');

var db = new mongo.Db('Users', new mongo.Server('localhost', 27017), {safe: true});

db.open(function (err,db) {
  if(!err) {
    console.log("We are connected");
  }
	else {
	console.log("We aren't connected" + err);
}
});



	var io = socketio.listen(server);
	io.set('log level', 1);
	io.sockets.on('connection', function (socket) {
		console.log('connection');
		socket.on('connect', function(data){			
			connect(socket, data);
			console.log("serwer connect");
		});
		
		socket.on('user', function (data){
			createuser(socket,data);
		});
	});


function connect(socket,data){
var username=data.username, password=data.password;
	var flaga = false;
	db.collection('users', function (err,collection) {
		collection.find().toArray(function(err,users){
			for( i = 0; i < users.length; i += 1) {
				if(users[i].username === username && users[i].password === password){
					flaga = true;
				}
			}
			if(!flaga){
				res.redirect('/login', { info: "Wrong nickname or password"});	
			} 
			else{
				io.sockets.emit('login', { username: username});
			}
		});
	});

}

function createuser(socket,data){

var zm1=data.username,zm2=data.password,zm3=data.email,zm4=data.userID;
	var flaga = false;
	db.collection('users', function (err,collection) {
		collection.find().toArray(function(err,users){
			for( i = 0; i < users.length; i += 1) {
				if(users[i].username === zm1) {
					flaga = true;
				}
			}
			if(!flaga){
 				collection.insert({"username": zm1, "password": zm2, "email": zm3, "userID": zm4}, function (err) {
					collection.find().toArray(function (err, users) {
                				console.log(users);
                				db.close();
            				});
				});
				io.sockets.emit('ready', { username: zm1, userID: zm4});	
			} 
			else{
				console.log("we are in else");
				/*var costam = function (res){
					console.log("we are in costam");
					res.redirect('/create', { username: zm1});
						
				}
				costam();*/
			}
		});
	});

	
}


}
