// Initial Array of Topics [7]
var topics = ["Oakland", "Oceano", "Warriors", "Tokyo", "Seoul", "Yokohama", "Berkeley"];

// Function re-renders the HTML to display the appropriate content
function displayTopicInfo() {

  var topic = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&limit=10&api_key=mmHTYu0gmGVGFNWcUcFfSYWO8d5k5fy1";

  // AJAX Call
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    var results = response.data;
    
    $("#topics-view").empty();
  
    var topicDiv = $("<div class='topic'>");

    for (var j = 0; j < results.length; j++) {
      var rating = results[j].rating;
      var pRate = $("<p>").text("Rating: " + rating);
      topicDiv.append(pRate);

      var imgURL = results[j].images.fixed_height.url;
      var imgStillURL = results[j].images.fixed_height_still.url;

      var image = $("<img>");
      image.attr({
        "src": imgStillURL,
        "data-still": imgStillURL,
        "data-animate": imgURL,
        "data-state": "still",
        "class":"gif"});

      topicDiv.append(image);
      $("#topics-view").prepend(topicDiv);
    }

    $(".gif").on("click", function() {
      var state = $(this).attr("data-state");
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
  
  $("#buttons-view").empty();

  for (var i = 0; i < topics.length; i++) {
    var a = $("<button>");
    a.addClass("topic-btn btn btn-info border");
    a.attr("data-name", topics[i]);
    a.text(topics[i]);
    $("#buttons-view").append(a);
  }
}

// This function handles events where a topic button is clicked
$("#add-topic").on("click", function(event) {
  event.preventDefault();
  
  var topic = $("#topic-input").val().trim();
  topics.push(topic);

  renderButtons();
});

// Adding a click event listener to all elements with a class of "topic-btn"
$(document).on("click", ".topic-btn", displayTopicInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();