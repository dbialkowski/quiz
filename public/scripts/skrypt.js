/*jshint node: true, browser: true, jquery: true */
/*global io: false */

$(document).ready(function () {
    'use strict';


	var userID=null,nickname,nicknameID;
	var username,password,email,emailConfirm,passLength,nicknameLogIn=null;
	var lp,words,tit1,tit2,tit3,tit4,answ=null,score=0;
var socket = io.connect('http://localhost:8000');



 
	$('a.login-window').click(function() {
		
		// Getting the variable's value from a link 
		var loginBox = $(this).attr('href');

		//Fade in the Popup and add close button
		$(loginBox).fadeIn(300);
		
		//Set the center alignment padding + border
		var popMargTop = ($(loginBox).height() + 24) / 2; 
		var popMargLeft = ($(loginBox).width() + 24) / 2; 
		
		$(loginBox).css({ 
			'margin-top' : -popMargTop,
			'margin-left' : -popMargLeft
		});
		
		// Add the mask to body
		$('body').append('<div id="mask"></div>');
		$('#mask').fadeIn(300);
		
		return false;
	});
	
	// When clicking on the button close or the mask layer the popup closed
	$('a.close, #mask').live('click', function() { 
	  $('#mask , .login-popup').fadeOut(300 , function() {
		$('#mask').remove();  
	}); 
	return false;
	});

	$('a.close, #mask').live('click', function() { 
	  $('#mask , .create-login-popup').fadeOut(300 , function() {
		$('#mask').remove();  
	}); 
	return false;
	});

$('.button').live('click', function (){
	$('#mask , .login-popup').fadeOut(300 , function() {
		$('#mask').remove();  
	}); 
	handleNick();

});


$('.create-button').live('click', function (){
	passLength=$('#create-password').attr('value');
	email=$('#create-email').attr('value');
	emailConfirm=$('#confirm-email').attr('value');
	if(passLength.length < "6" ){
		document.getElementById("validate-pass").innerHTML='<p>Password must have min 6 sign</p>';
	}
	else{
		if (email != emailConfirm){
			document.getElementById("validate-email").innerHTML='<p>Wrong email</p>';
		}
		else{
			$('#mask , .create-login-popup').fadeOut(300 , function() {
				$('#mask').remove();  
			}); 
			createAccount();
		}
	}
});


$('a.start').live('click', function() {

	socket.emit('start', {userID: userID});

});

function createAccount(){
	username=$('#create-username').attr('value');
	password=$('#create-password').attr('value');
	email=$('#create-email').attr('value');
	emailConfirm=$('#confirm-email').attr('value');
	if(userID === null){	
		userID=randomID();
	}
	$('#komunikat').append('<div id='+userID+'></div>');
socket.emit('user',{username: username, password: password, email: email, userID: userID});

}


function handleNick(){
	 username = $('#username').attr('value');
	 password = $('#password').attr('value');
	if(userID === null){	
		userID=randomID();
	}
	 $('#komunikat').append('<div id='+userID+'></div>');
	socket.emit('connect', { username: username, password: password,userID: userID});
}


socket.on('random',function(data){
	lp=data.lp;
	words=data.words;
	tit1=data.tit1;
	tit2=data.tit2;
	tit3=data.tit3;
	tit4=data.tit4;
	answ=data.answ;
if(userID === data.userID){
	$('#questions p').text(words);
	$('#answer1 p').text(tit1);
	$('#answer2 p').text(tit2);
	$('#answer3 p').text(tit3);
	$('#answer4 p').text(tit4);
	setStyle('answer1', {'background':'#FFE4B5','color': '#blue !important','text-shadow': '0 1px 1px #2c803c'});
	setStyle('answer2', {'background':'#FFE4B5','color': '#blue !important','text-shadow': '0 1px 1px #2c803c'});
	setStyle('answer3', {'background':'#FFE4B5','color': '#blue !important','text-shadow': '0 1px 1px #2c803c'});
	setStyle('answer4', {'background':'#FFE4B5','color': '#blue !important','text-shadow': '0 1px 1px #2c803c'});
}
});

socket.on('ready', function(data){
		nickname = data.username;
		if( userID === data.userID){
			$('#'+userID).text('The User: '+nickname+' Has Been Created. Now you can Sign In!');
		}
	});

socket.on('notready', function(data){
		nickname = data.username;
		if( userID === data.userID){
			$('#'+userID).text('The User: '+nickname+' Excist. Please change your nickname');
		}
	});

socket.on('notloged', function(data){
		
		if(userID === data.userID){
			$('#'+userID).text('Wrong nickname or password');
		}
	});

socket.on('loged', function(data){
		nicknameLogIn = data.username;
		nicknameID = data.realID;
		
		if( userID === data.userID){
			$('#komunikat').append(' <div class="big-button-green"><a href="#start" class="start">Start!</a></div>  <a> Hello '+nicknameLogIn+'!</a>');
		}

			$('#quiz-clients ul').append('<li>'+nicknameLogIn+'</li>');
	
	});

	$('.answer1').live('click',function (){
	    if(answ !== null){
		if(tit1 === answ){
			score += 1;
			setStyle('answer1', {'background':'#369e4a'});
		}
		else{
			setStyle('answer1', {'background':'red'});
		}
	    }
	}); 

	$('.answer2').live('click',function (){

	    if(answ !== null){
	 	if(tit2 === answ){
			score += 1;
			setStyle('answer2', {'background':'#369e4a'});
		}
		else{
			setStyle('answer2', {'background':'red'});
		}
	    }	 	
	}); 

	$('.answer3').live('click',function (){

	    if(answ !== null){
	 	if(tit3 === answ){
			score += 1;
			setStyle('answer3', {'background':'#369e4a'});
		}
		else{
			setStyle('answer3', {'background':'red'});
		}
	    }	 	
	}); 

	$('.answer4').live('click',function (){
		
	    if(answ !== null){
	 	if(tit4 === answ){
			score += 1;
			setStyle('answer4', {'background':'#369e4a'});
		}
		else{
			setStyle('answer4', {'background':'red'});
		}
	    }	 	
	}); 


function randomID(){
		return (((1 + Math.random()) * 0x10000) | 0).toString(16);
	}

function setStyle( objId, propertyObject ){
	 var elem = document.getElementById(objId);
	 for (var property in propertyObject){
   		 elem.style[property] = propertyObject[property];
	}
}


});
