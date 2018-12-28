var room_type, room_no;
var bookings_rooms = document.getElementById('bookings_rooms');
var app = angular.module('myRooms', []);
$(document).ready(function(){
	$(".btn_book").click(function(){
		$(this).hide();
        $(this).next().show();
		room_type  = $(this).val();
		$("#typeroom").val(room_type);
	});
});







