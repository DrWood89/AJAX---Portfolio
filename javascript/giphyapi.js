// Initial array of movies
var athletes = ["Lebron James", "Christiano Ronaldo", "Leonel Messi", "Muhamed Ali"];
// Function for displaying movie data
function renderButtons() {
    // Deleting the movie buttons prior to adding new movie buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#movies-view").empty();
    // Looping through the array of movies
    for (var i = 0; i < athletes.length; i++) {
        // Then dynamicaly generating buttons for each movie in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class
        a.addClass("ath");
        // Adding a data-attribute with a value of the movie at index i
        a.attr("data-name", athletes[i]);
        // Providing the button's text with a value of the movie at index i
        a.text(athletes[i]);
        // Adding the button to the HTML
        $("#movies-view").append(a);
    }
}

// This function handles events where one button is clicked
$("#add-athlete").on("click", function (event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();
    // This line will grab the text from the input box
    var athlete = $("#athlete-input").val().trim();
    // The movie from the textbox is then added to our array
    athletes.push(athlete);
    // calling renderButtons which handles the processing of our movie array
    renderButtons();
});
// Calling the renderButtons function at least once to display the initial list of movies
renderButtons();

$("#movies-view").on("click", 'button', function () {
    $('#gif-cont').empty();
    // In this case, the "this" keyword refers to the button that was clicked
    var person = $(this).attr("data-name");
    // Constructing a URL to search Giphy for the name of the person who said the quote
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=DSlQTHRsXz7c5c1RFNcaWsTDKv6UqFmd&limit=10";
    // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After the data comes back from the API
        .then(function (response) {
            // Storing an array of results in the results variable
            var results = response.data;
            console.log(response);
            // Looping over every result item
            for (var i = 0; i < results.length; i++) {
                console.log(results[i]);
                // Only taking action if the photo has an appropriate rating
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    // Creating a div with the class "item"
                    var gifDiv = $("<div class='item'>");
                    // Storing the result item's rating
                    var rating = results[i].rating;
                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + rating);
                    // Creating an image tag
                    var personImage = $("<img>");
                    personImage.addClass("athlete");
                    // Giving the image tag an src attribute of a proprty pulled off the
                    // result item
                    personImage.attr('data-isMoving', true);
                    personImage.attr("src", results[i].images.original.url);
                    personImage.attr("data-still", results[i].images.original_still.url);
                    personImage.attr("data-move", results[i].images.original.url);
                    // Appending the paragraph and personImage we created to the "gifDiv" div we created
                    gifDiv.append(p);
                    gifDiv.append(personImage);
                    // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                    $("#gif-cont").prepend(gifDiv);
                }
            }
        });
});
        $("#gif-cont").on("click", '.athlete', function() {
            // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
            var state = $(this).attr("data-isMoving");
            console.log(state);
            // If the clicked image's state is still, update its src attribute to what its data-animate value is.
            // Then, set the image's data-state to animate
            // Else set src to the data-still value
            if(state === "true") {
                console.log("state inside is "+state);
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-isMoving", false);
            }
            else {
                console.log('hit');
                $(this).attr("src", $(this).attr("data-move"));
                $(this).attr("data-isMoving", true);
            }
          });


