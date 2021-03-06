/*jshint node: true */
var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var less = require('less-middleware');
//var quiz = require('./public/scripts/quiz');

app.configure(function () {
    app.set('port', process.env.PORT || 8000);
 //   app.use(app.router);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(less({
        src: __dirname + '/public',
        compress: true
    }));
    
    app.use(express.static(path.join(__dirname, 'public')));
});

//app.get('/login', quiz.login);
//app.get('/create',quiz.create);

var server = http.createServer(app).listen(app.get('port'), function () {
    console.log("Serwer nasłuchuje na porcie: http://localhost:" + app.get('port'));
});





var quizServer = require('./lib/quiz_server');
quizServer.listen(server);

