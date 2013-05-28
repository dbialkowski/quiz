/*jshint node: true, browser: true, jquery: true */
/*global io: false */
$(document).ready(function () {
    'use strict';


	var nicknameID = null,
	    nickname = {},
	    nicknameMy = {};

var socket = io.connect('http://localhost:8000');

	var	tmplt = {
			client: [
				'<li>',
					'<div class="fl nickname"><span class="icon"></span> ${nickname}</div>',
				'</li>'
			].join("")
		};

 
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

$('.button-begin #change-button').on('click', function (){
	handleNick();

});

function handleNick(){
	 nickname = $('.input #send-nick').attr('value');
	 nicknameMy = $('.input #send-nick').attr('value');
	socket.emit('connect', { nickname: nickname });

	showNickname(nickname,true,false);
}

socket.on('ready', function(data){
		nickname = data.client.nickname;
		showNickname(nickname,false,true);
	});

function showNickname(nickname,Me,Server){

//	var $html = $.tmpl(tmplt.client, {
//			nickname: nickname
//		});

	if(Me){
		//$html.addClass('marker');
		//$('#me ul').append('<li>'+nickname+'</li>');
		document.getElementById("me").innerHTML='<li>'+nicknameMy+'</li>';
	}
	if(Server){
		//$html.find('.nickname');
		$('#people ul').append('<li>'+nickname+'</li>');
	}
	//$html.appendTo('#messages ul');
}

/*function addClass( element, name ) {
		element.className = element.className.replace( /\s+$/gi, '' ) + ' ' + name;
	}*/
		



});
