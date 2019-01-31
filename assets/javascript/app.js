var address;
var name;
var photo;
var rating;
var costForTwo;
var phone;
var menu;
var index=0;

var createRestCard = function(restaurant[index])


$(document.body).on("click", "#search", function() {
    event.preventDefault();
    
    var zipCode = $("#zipCode").val().trim();
    console.log(zipCode)

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
        
        searchTerm = $("#search-word").val().trim();

        var queryURL2 = "https://developers.zomato.com/api/v2.1/geocode?lat=" + latitude + "&lon=" + longitude +"&apikey=098ad5d6975d7ea08066552ab99e9d82";
        return $.ajax({
            url: queryURL2,
            method: "GET"
            })
        }).then(function(response){
            console.log(response)
            var entityID = response.location.entity_id;
            console.log(entityID);
            var entityType = response.location.entity_type;
            console.log(entityType);

            var queryURL3 = "https://developers.zomato.com/api/v2.1/search?entity_id=" + entityID + "&entity_type=" + entityType + "&q=" + searchTerm + "&sort=rating&apikey=098ad5d6975d7ea08066552ab99e9d82";
            $.ajax({
                url: queryURL3,
                method: "GET"
            }).then(function(response) {
                var restaurant = response.restaurants;
                console.log(response);
                address = response.location.address;
                console.log(address);
                photo = response.featured_image;
                console.log(photo);
                name = response.name;
                console.log(name);
                rating = response.user_rating.aggregate_rating;
                console.log(rating);
                costForTwo = response.average_cost_for_two;
                console.log(costForTwo);

                // create div for all of the restaurant information 
                var restaurantDiv = $("<div>");

                // create an image div for the restaurant image to go to
                var photoDiv = $("<img>");
                // give photoDiv attributes for image
                photoDiv.attr("src", photo);
                photoDiv.addClass("photoClick")
                photoDiv.attr("height", '300');
                photoDiv.attr("width", '300');

                // put the name variable inside of a p tag
                var pName = $("<p>").text(name);

                // put the rating into a p tag 
                var pRating = $("<p>").text(`Rating: ${rating}/5`);

                // put the address into a p tag
                var pAddress = $("<p>").text(address);

                // put all of the divs into the restaurantDiv
                restaurantDiv.prepend(pRating);
                restaurantDiv.prepend(pAddress);
                restaurantDiv.prepend(pName);
                restaurantDiv.prepend(photoDiv);

                // put the restaurantDiv into the restaurant-container div from your html
                $("#restaurant-container").prepend(restaurantDiv);
            })
    })
})

$(document.body).on("click", ".photoClick", function() {
    $("#restaurant-container").empty();
    index++;
    //index =1


})








// var cityID;

// $(document.body).on("click", "#search-city", function() {
//     var city = $("#city").val().trim();

//     var queryURL = "https://developers.zomato.com/api/v2.1/cities?q=" + city + "&apikey=098ad5d6975d7ea08066552ab99e9d82"

//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function(response) {
//         console.log(response)
//         cityID = response.location_suggestions[0].id;
//         console.log(cityID);
//         // if array location_suggestions is empty, send to user enter valid city  
//     })
// })

// $(document.body).on("click", "search-cuisine", function() {
//     var cuisine = $("#cuisine").val().trim();

//     var queryURLnew ="https://developers.zomato.com/api/v2.1/cuisines?apikey=098ad5d6975d7ea08066552ab99e9d82&city_id=" + cityID;
    
//     $.ajax({
//         url: queryURLnew,
//         method: "GET"
//     }).then(function(response) {
//         console.log(response);
//     })
// })
