/*jshint node: true, browser: true, jquery: true */
/*global io: false */

$(document).ready(function () {
    'use strict';


	var userID,nickname,nicknameID;
	var username,password,email,emailConfirm,passLength;

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

function createAccount(){
	username=$('#create-username').attr('value');
	password=$('#create-password').attr('value');
	email=$('#create-email').attr('value');
	emailConfirm=$('#confirm-email').attr('value');
	userID=randomID();
	$('#komunikat').append('<div id='+userID+'></div>');
socket.emit('user',{username: username, password: password, email: email, userID: userID});

}


function handleNick(){
	 username = $('#username').attr('value');
	 password = $('#password').attr('value');
	socket.emit('connect', { username: username, password: password });
}

socket.on('ready', function(data){
		nickname = data.username;
		nicknameID = data.userID;
		if( nicknameID === userID){
			$('#'+nicknameID).text('The User: '+nickname+' Has Been Created. Now you can Sign In!');
		}
	});
/*
socket.on('notready', function(data){
		nickname = data.username;
		$('#komunikat p').text('The User: '+nickname+' Excist. Please change your nickname');
	});

*/
function randomID(){
		return (((1 + Math.random()) * 0x10000) | 0).toString(16);
	}
});
