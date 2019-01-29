

$(document.body).on("click", "#search-zip", function() {
    var zipCode = $("#zipCode").val().trim();

    var queryURL = "https://proapi.whitepages.com/3.0/location?api_key=5f76840c732548e7a659bd72b687d8d1&postal_code=" + zipCode

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)
    })
})

