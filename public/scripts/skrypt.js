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

 
$('a[rel*=leanModal]').leanModal({ top : 200, closeButton: ".modal_close" });

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
