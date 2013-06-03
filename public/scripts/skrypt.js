/*jshint node: true, browser: true, jquery: true */
/*global io: false */

$(document).ready(function () {
    'use strict';


	var nicknameID = null,
	    nickname = {},
	    nicknameMy = {};

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
	if(passLength.length < "6" ){document.getElementById("validate-pass").innerHTML='<p>Password must have min 6 sign</p>';}
	else{
	if (email != emailConfirm){
		//$('#confirm-email').append('<li>Wrong email</li>');
		document.getElementById("validate-email").innerHTML='<p>Wrong email</p>';
	}
	else{
		$('#mask , .create-login-popup').fadeOut(300 , function() {
			$('#mask').remove();  
		}); 
		createAccount();
	}}

});

function createAccount(){
	username=$('#create-username').attr('value');
	password=$('#create-password').attr('value');
	email=$('#create-email').attr('value');
	emailConfirm=$('#confirm-email').attr('value');
	
socket.emit('user',{username: username, password: password, email: email});

}


function handleNick(){
	 nickname = $('#username').attr('value');
	 nicknameMy = $('#username').attr('value');
	socket.emit('connect', { nickname: nickname });

	showNickname(nickname,true,false);
}

socket.on('ready', function(data){
		nickname = data.username;
		$('#quiz-clients ul').append('<li>'+nickname+'</li>');
	});


});
