var review_rest = document.getElementById('review_rest');
var review_hotel = document.getElementById('review_hotel');
var booked_rooms = document.getElementById('booked_rooms');
var bookings_rooms= document.getElementById('bookings_rooms');
var hotel = document.getElementById('hotel_name');
var dish = document.getElementsByClassName('dish');
var price = document.getElementsByClassName('price');
var quantity = document.getElementsByClassName('quantity');
var final_price = document.getElementsByClassName('final_price');
var placeorder = document.getElementById('order_place');
var vieworder = document.getElementById('view_order');
var mydish = document.getElementById('mydish');
var myquantity = document.getElementById('myquantity');
var myprice = document.getElementById('myprice');
var cost = document.getElementById('cost');
var del = document.getElementById('delete');
var comp = document.getElementById('comp');
var o =document.getElementById('order');
var app = angular.module('myApp', []);
app.controller('order_Ctrl',function($scope){
     var arr_dish= [], arr_quant = [], arr_price = [];
    $scope.dish = '';
    $scope.quant = '';
    $scope.price = '';
    $scope.addItem = function(){
        // Retrieving the id clicked
        var id = event.srcElement.id;
        // Retrieving the number of items, their price and their final price for the user
        var q = quantity[id-1];
        var p =  price[id-1];
        var fp = final_price[id-1];
        // Changing all these to numbers
        var quan = Number(q.innerHTML);
        var pr = Number(p.innerHTML);
        var fpr = Number(fp.innerHTML);
         q.innerHTML = (quan + 1);
         fp.innerHTML = (fpr + pr); 
        // For arr_dish contains all dishes
        if(q.innerHTML == 1) {
            $scope.dish += dish[id-1].innerHTML + ',';
            arr_dish = $scope.dish.split(",");
        // For arr_quantity containing all quantities
            arr_quant += q.innerHTML + ',';
            arr_quant = arr_quant.split(",");
            $scope.quant = arr_quant.toString();
        // For arr_price containing all prices
            arr_price += fp.innerHTML + ',';
            arr_price = arr_price.split(",");
            $scope.price = arr_price.toString();
       }
       else{
           for(i=0; i< arr_dish.length;i++){
               if(dish[id-1].innerHTML == arr_dish[i]){
                   arr_quant[i] = q.innerHTML;
                   arr_price[i] = fp.innerHTML;
               }
           } 
        }
    };
    $scope.bill = function(){
        placeorder.style.display = 'none';
        vieworder.style.display = 'block';
        $scope.total_price = 0;
        var price;
        for(i=0;i<arr_dish.length;i++){
            mydish.innerHTML += arr_dish[i] + '<br>';
            myquantity.innerHTML += arr_quant[i] + '<br>';
            myprice.innerHTML += arr_price[i] + '<br>';
            price = Number(arr_price[i]);
            $scope.total_price += price;
        }
        cost.innerHTML = $scope.total_price;
    };
});
app.controller('Ctrl_orders', function($scope, $http){
    alert("Hai, Here's Your Order");
    $http({
      method: "GET",
      url: "/get_orders"
    }).then(function mySuccess(response){
        $scope.object = response.data;
        var len = $scope.object.length;
        for(var i = 0; i<len; i++){
              o.style.display = 'block';
               var d = $scope.object[i].dish;
               var q = $scope.object[i].quantity;
               var p = $scope.object[i].price;
               dish = d.split(',');
               quan = q.split(',');
               pr = p.split(',');
            for(j=0;j<dish.length;j++){
               mydish.innerHTML += dish[j] + '<br>';
               myquantity.innerHTML += quan[j] + '<br>';
               myprice.innerHTML += pr[j] + '<br>';
            }
            $scope.c = $scope.object[i].total;
            cost.innerHTML += "<h2 class = 'color_navy'>Total Cost is " + $scope.c + "</h2>";
            del.innerHTML += "<a href = '/delete/:" + $scope.object[i]._id + "'>Cancel  Order</a>";
            comp.innerHTML += "<a href = '/delete/:" + $scope.object[i]._id + "'>Order Completed </a>";
        }
    },function myError(response){
        alert(response);
    });
});
app.controller('reviews_rest', function($scope, $http){
    $http({
      method: "GET",
      url: "/get_review_rest"
    }).then(function mySuccess(response){
        $scope.object = response.data;
        var len = $scope.object.length;
        for(var i = 0; i<len; i++){
              review_rest.innerHTML+= "<div class='container2 darker'><img src='/a/images/avtar.png' alt='Avatar' style='width:90px;'><p>" + $scope.object[i].name + "<p>" + $scope.object[i].reviews + "</p></div>";            
        }
    },function myError(response){
        alert("Error");
    });
});

app.controller('reviews_hotel', function($scope, $http){
    $http({
      method: "GET",
      url: "/get_review_hotel"
    }).then(function mySuccess(response){
        $scope.object = response.data;
        var len = $scope.object.length;

        for(var i = 0; i<len; i++){
              review_hotel.innerHTML+= "<div class='container2'><img src='/a/images/avtar.png' alt='Avatar' style='width:90px;'><p>" + $scope.object[i].name + "<p>" + $scope.object[i].reviews + "</p></div>";            
              }
    },function myError(response){
        alert("Error");
    });
});

app.controller('Ctrl_rooms_user', function($scope, $http){
    $http({
      method: "GET",
      url: "/get_rooms_user"
    }).then(function mySuccess(response){
        $scope.object = response.data;
        var len = $scope.object.length;
        for(var i = 0; i<len; i++){  
           bookings_rooms.innerHTML+= "<div class='w3-card-4 card_book'><header class='w3-container w3-light-grey'><h3>"+ 
           $scope.object[i].name + "</h3></header><div class='w3-container'>" + 
           "<p>" + $scope.object[i].room_type + " Booked for you" + 
           "</p><hr><img src='/a/images/avtar.png' class='w3-left w3-circle w3-margin-right' style='width:60px'>" +
           "<p> The Room is booked for " + $scope.object[i].name + " and for " + $scope.object[i].name_another +    
            " from " + $scope.object[i].date_from + " to " + $scope.object[i].date_to + "</p><br></div>" + 
            "<button class='w3-button w3-block w3-dark-grey'>Check In Room</button></div>";
        }
        },function myError(response){
        alert(response);
    });
});

app.controller('Ctrl_rooms_admin', function($scope, $http){
    $http({
      method: "GET",
      url: "/get_rooms_admin"
    }).then(function mySuccess(response){
        $scope.object = response.data;
        var len = $scope.object.length;
        for(var i = 0; i<len; i++){       
           booked_rooms.innerHTML+= "<div class='w3-card-4 card_book'><header class='w3-container w3-light-grey'>"+ 
           "<h3 style = 'margin-top:10px'>" + $scope.object[i].name + "</h3></header><div class='w3-container'>" + 
           "<p>" + $scope.object[i].room_type + " Booked for you" + 
           "</p><hr><img src='/a/images/avtar.png' class='w3-left w3-circle w3-margin-right' style='width:60px'>" +
           "<p>Your Room is "+ $scope.object[i].room_no + ". The Room is booked for " + $scope.object[i].name + " and for " +
            $scope.object[i].name_another + " from " + $scope.object[i].date_from + " to " + 
            $scope.object[i].date_to + ". Enjoy the stay!!</p><br></div>" + 
            "<button class='w3-button w3-block w3-dark-grey'>Check Out Room</button></div>";
            }
        },function myError(response){
        alert(response);
    });
});
