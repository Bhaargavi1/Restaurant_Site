var room_type, room_no;
 var book_room= document.getElementById("booked_rooms");
var badge = document.getElementsByClassName("badge");
$(document).ready(function(){
	$(".badge").click(function(){
		if($(this).hasClass("badge-success")){
			$(this).removeClass("badge-success");
		}
		else{
			$(this).addClass("badge-success");
			room_no  = $(this).val();
			room_type = $(this).parent("p").siblings().attr("id");
			$("#noroom").val(room_no);
			$("#typeroom").val(room_type);
		}
	});
});
var app = angular.module("myApp", []);
app.controller('Ctrl_rooms', function($scope, $http){
    $http({
      method: "GET",
      url: "/get_rooms_admin"
    }).then(function mySuccess(response){
        $scope.object = response.data;
        var len = $scope.object.length;
        $scope.rooms = "";
        for(var i = 0; i<len; i++){       
            for(var j=0;j<81; j++){
                    if(badge[j].value == $scope.object[i].room_no){
                        badge[j].classList.add("badge-success");
                        break;
                    }
                }
            }
        },function myError(response){
        alert(response);
    });
});
