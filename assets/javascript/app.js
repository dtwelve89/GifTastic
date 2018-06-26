// Initial Array of Topics [7]
var topics = ["Oakland", "Oceano", "Saigon", "Tokyo", "Seoul", "Yokohama", "Berkeley"];

// Function re-renders the HTML to display the appropriate content
function displayTopicInfo() {

  var topic = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&limit=10&api_key=mmHTYu0gmGVGFNWcUcFfSYWO8d5k5fy1";

  // Creating an AJAX call for the specific topic button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    var results = response.data;
    
    $("#topics-view").empty();
  
      // Creating a div to hold the topic
      var topicDiv = $("<div class='topic'>");

      for (var j = 0; j < results.length; j++) {

      // Storing the rating data
      var rating = results[j].rating;

      // Creating an element to have the rating displayed
      var pRate = $("<p>").text("Rating: " + rating);

      // Displaying the rating
      topicDiv.append(pRate);

      // Retrieving the URL for the image
      var imgURL = results[j].images.fixed_height.url;
      var imgStillURL = results[j].images.fixed_height_still.url;

      // Creating an element to hold the image
      var image = $("<img>");
      image.attr("src", imgStillURL);
      image.attr("data-still", imgStillURL);
      image.attr("data-animate", imgURL);
      image.attr("data-state", "still");
      image.attr("class","gif");

      // Appending the image
      topicDiv.append(image);

      // Inserting the topic
      $("#topics-view").prepend(topicDiv);

      }

          $(".gif").on("click", function() {
          // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
          var state = $(this).attr("data-state");
          // If the clicked image's state is still, update its src attribute to what its data-animate value is.
          // Then, set the image's data-state to animate
          // Else set src to the data-still value
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
      });
      
  });

}

// Function for displaying topic data
function renderButtons() {
  
  // Deleting the topics prior to adding new topics
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of topics
  for (var i = 0; i < topics.length; i++) {

    // Then dynamicaly generating buttons for each topic in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of topic-btn to our button
    a.addClass("topic-btn");
    // Adding a data-attribute
    a.attr("data-name", topics[i]);
    // Providing the initial button text
    a.text(topics[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where a topic button is clicked
$("#add-topic").on("click", function(event) {
  event.preventDefault();
  
  // This line grabs the input from the textbox
  var topic = $("#topic-input").val().trim();

  // Adding topic from the textbox to our array
  topics.push(topic);

  // Calling renderButtons which handles the processing of our topic array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "topic-btn"
$(document).on("click", ".topic-btn", displayTopicInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();