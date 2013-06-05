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
		});
		
		socket.on('user', function (data){
			createuser(socket,data);
		});
		
		socket.on('start', function (data){
			start(socket,data);
		});
	});

function start(socket,data){
var userID=data.userID;
var username,email,nil;
	db.collection('music', function (err,collection) {
		var number = Math.floor((Math.random()*10)+1).toString(10);
		console.log(number);
		collection.findOne({ "lp": { $gte: number } }, function (err, item) {
                    console.log(item);
			io.sockets.emit('random', { 	lp: item.lp,
							words: item.words,
							tit1: item.tit1,
							tit2: item.tit2,
							tit3: item.tit3,
							tit4: item.tit4,
							answ: item.answ, 
							userID: userID								
							});
                });
	});

}

function connect(socket,data){
var username=data.username, password=data.password, userID=data.userID;
	var flaga = false;
	var ID;
	db.collection('users', function (err,collection) {
		collection.find().toArray(function(err,users){
			for( i = 0; i < users.length; i += 1) {
				if(users[i].username === username && users[i].password === password){
					flaga = true;
					ID=users[i]._id;
					console.log(ID);					
				}
			}
			if(!flaga){
				io.sockets.emit('notloged', {userID: userID});	
			} 
			else{
				io.sockets.emit('loged', { username: username, userID: userID, realID: ID});
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
 				collection.insert({"username": zm1, "password": zm2, "email": zm3}, function (err) {
					collection.find().toArray(function (err, users) {
                				console.log(users);
            				});
				});
				io.sockets.emit('ready', { username: zm1, userID: zm4});	
			} 
			else{
				
				io.sockets.emit('notready', { username: zm1, userID: zm4});
			}
		});
	});

	
}


}
