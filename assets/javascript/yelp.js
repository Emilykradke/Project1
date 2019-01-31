var address;
var name;
var photo;
var rating;
var phone;
var price;
var hours;
var index = 0;
var restaurantsID;

var createRestCard = function(response) {
    name = response.name;
    address = `${response.location.display_address[0]}
               ${response.location.display_address[1]}`
    photo1 = response.photos[0];
    photo2 = response.photos[1];
    photo3 = response.photos[2];
    rating = response.rating;
    price = response.price;
    phone = response.display_phone;
    

    // create div for all of the  restaurant information
    var restaurantDiv = $("<div>");

    // create an image div for the restaurant images to go to and img divs for each photo
    var photoDiv = $("<div>");
    // give photoDiv a class
    photoDiv.addClass("restaurantPhotos");

    var imgDiv1 = $("<img>");
    var imgDiv2 = $("<img>");
    var imgDiv3 = $("<img>");

    // give photoDiv attributes for image
    imgDiv1.attr("src", photo1);
    imgDiv1.addClass("slickImg")
    imgDiv2.attr("src", photo2);
    imgDiv2.addClass("slickImg")
    imgDiv3.attr("src", photo3);
    imgDiv3.addClass("slickImg")
    // put the name variabe inside of a p tag
    var pName = $("<p>").text(name);

    // put the rating into a p tag
    var pRating = $("<p>").text(`Rating: ${rating}/5`);

    // put the address into a p tag
    var pAddress = $("<p>").text(address);

    // put the phone number into a p tag
    var pPhone = $("<p>").text(phone);

    // put the price into a p tag
    var pPrice = $("<p>").text(`Price: ${price}`);

    // put all of the divs into the restaurantDiv
    restaurantDiv.prepend(pRating);
    restaurantDiv.prepend(pAddress);
    restaurantDiv.prepend(pPhone);
    restaurantDiv.prepend(pPrice);
    restaurantDiv.prepend(pName);

    // append each image into the photoDiv
    photoDiv.append(imgDiv1)
    photoDiv.append(imgDiv2)
    photoDiv.append(imgDiv3)

    // append the photoDiv into the restaurantDiv
    restaurantDiv.prepend(photoDiv);

    // put the restaurantDiv into the restaurant-container div from the html
    $("#restaurant-container").prepend(restaurantDiv);
}


$(document.body).on("click", "#search", function() {
    event.preventDefault();

    var zipCode = $("#zipCode").val().trim();
    
    var queryURL = "https://proapi.whitepages.com/3.0/location?api_key=5f76840c732548e7a659bd72b687d8d1&postal_code=" + zipCode
   
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)
        var latitude = response.lat_long.latitude;

        console.log(latitude)
        var longitude = response.lat_long.longitude;
        console.log(longitude)
    
        var miles = $("#radiusMiles").val();
        var meters = miles * 1609;
        console.log(meters);
        
        var price = $("#price").val();
        
        var searchTerm = $("#search-word").val().trim();

        var queryURLyelp = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=" + latitude + "&longitude=" + longitude+ "&term=" + searchTerm + "&price=" + price + "&radius=" + meters;
        console.log(queryURLyelp)
        return $.ajax({
            url: queryURLyelp, 
            method: "GET",
            dataType: "json",
            headers: {
                "Authorization": "Bearer pTQUykRWiS1bm2vmyys495t9RcKg-SVvv72vC734JyFxrQEaveyZPQCKAMbg5MSMUCFaP13aBAtXoFtRY_xqXi3tCX5bOWsU-a4YiSMvywpYG9softopDf5O5XxOXHYx"
            },
        }).then(function(response){
            console.log(response)

            for(var i = 0; i < 3; i++) {
                console.log(i)
                console.log(response.businesses[i])
                restaurantsID = response.businesses[i].id
                    
                console.log(restaurantsID)

            var queryURLyelpRest = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" + restaurantsID
            $.ajax({
                url: queryURLyelpRest,
                method: "GET",
                dataType: "json",
                headers: {
                    "Authorization": "Bearer pTQUykRWiS1bm2vmyys495t9RcKg-SVvv72vC734JyFxrQEaveyZPQCKAMbg5MSMUCFaP13aBAtXoFtRY_xqXi3tCX5bOWsU-a4YiSMvywpYG9softopDf5O5XxOXHYx"
                }
            }).then(function(response) {
                console.log(response);
                createRestCard(response);
            })
            }   
        })
    })
})