var address;
var name;
var photo;
var rating;
var phone;
var price;
var hoursOpen;
var openArray = [];
var hoursClosed;
var closedArray = [];
var index = 0;
var restaurantIndex = 0;
var restaurants = [];

// hide the restaurant container on load of the page 
$('.restaurant-container').hide();

// function to create the restaurant information from the ajax response
var createRestCard = function(restaurant) {
    $('.restaurant-container').show();

    var queryURLyelpRest = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" + restaurant.id;

    $.ajax({
        url: queryURLyelpRest,
        method: "GET",
        dataType: "json",
        headers: {
            "Authorization": "Bearer pTQUykRWiS1bm2vmyys495t9RcKg-SVvv72vC734JyFxrQEaveyZPQCKAMbg5MSMUCFaP13aBAtXoFtRY_xqXi3tCX5bOWsU-a4YiSMvywpYG9softopDf5O5XxOXHYx"
        }
    }).then(function(response) {
        name = response.name;
        address = `${response.location.display_address[0]}
        ${response.location.display_address[1]}`
        photo1 = response.photos[0];
        rating = response.rating;
        price = response.price;
        phone = response.display_phone;

        // clear hour arrays and repopulate with restaurant hours
        openArray = [];
        closedArray = [];
        console.log(response);

        // Getting the time from the ajax response, converting it from military time, and then pushing it to an array
        for(var i = 0; i < 7; i++) {
            hoursOpen = response.hours[0].open[i].start;
            var openCon = moment(hoursOpen, 'HHmm').format('LT');
            openArray.push(openCon);
    
            hoursClosed = response.hours[0].open[i].end;
            var closedCon = moment(hoursClosed, 'HHmm').format('LT');
            closedArray.push(closedCon);
        }

        // populate hours in restaurant card
        for(var i = 0; i < 7; i++) {
            $(`#hours-${i}`).text(`${openArray[i]} - ${closedArray[i]}`);
        }

        // populating the restaurant card DOM elements
        $("#restaurant-title").text(name);
        $("#restaurant-price").text(price);
        $("#restaurant-phone").text(phone);
        $("#restaurant-address").text(address);
        $("#restaurant-rating").text(`${rating}/5`);
        $("#restaurant-photo").attr("src", photo1);
    })
}

$(document.body).on("click", "#search", function() {
    event.preventDefault();

    var zipCode = $("#zipCode").val().trim();
    
    var queryURL = "http://dataservice.accuweather.com/locations/v1/search?q=" + zipCode + "&apikey=93IHD7yLyLQ38YB3mDKE2xSQfPg20nHA";
   
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        // console.log(response);
        var latitude = response[0].GeoPosition.Latitude;
        var longitude = response[0].GeoPosition.Longitude;
        var miles = $("#radiusMiles").val();
        var meters = miles * 1609;
        var price = $("#price").val();
        var searchTerm = $("#search-word").val().trim();
        var queryURLyelp = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=" + latitude + "&longitude=" + longitude + "&term=" + searchTerm + "&price=" + price + "&radius=" + meters;
        return $.ajax({
            url: queryURLyelp, 
            method: "GET",
            dataType: "json",
            headers: {
                "Authorization": "Bearer pTQUykRWiS1bm2vmyys495t9RcKg-SVvv72vC734JyFxrQEaveyZPQCKAMbg5MSMUCFaP13aBAtXoFtRY_xqXi3tCX5bOWsU-a4YiSMvywpYG9softopDf5O5XxOXHYx"
            },
        }).then(function(response){
            restaurants = response.businesses;
        })
    }).then(function() {
        shuffle(restaurants);
        createRestCard(restaurants[index]);
    })
})

$(document.body).on("click", "#nextRestaurant", function() {
    // if the index is already at the end of array, set it to the start
    if (restaurantIndex === 5) {
        restaurantIndex = 0;
    } else {
        restaurantIndex++;
    }

    createRestCard(restaurants[restaurantIndex]);
})

$(document.body).on("click", "#prevRestaurant", function() {
    // if the index is already at the start of array, set it to the end
    if (restaurantIndex === 0) {
        restaurantIndex = 5;
    } else {
        restaurantIndex--;
    }

    createRestCard(restaurants[restaurantIndex]);
})

// I found this on GitHub (Shuffles an array that is passed as an argument)
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
