// Initial Array of Topics [8]
var topics = ["Oakland", "Warriors", "Berkeley", "Tokyo", "Shiba Inu", "Wu-Tang Clan", "Yosemite Park", "Vietnam"];

// Function Re-rendering the HTML to Display Content
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

    for (var j = 0; j < results.length; j++) {
      var topicDiv = $("<figure class='box'>");
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

    // GIF Pause and Play Function
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

// Function for Creating and Rendering Topic Buttons
function renderButtons() {
  
  $("#buttons-view").empty();

  for (var i = 0; i < topics.length; i++) {
    var b = $("<button>");
    b.addClass("topic-btn btn btn-info border");
    b.attr("data-name", topics[i]);
    b.text(topics[i]);
    $("#buttons-view").append(b);
  }
}

// Submit Click Function To Add New Topic Buttons
$("#add-topic").on("click", function(event) {
  event.preventDefault();
  
  var topic = $("#topic-input").val().trim();
  topics.push(topic);

  renderButtons();
});

// Button Click Function To Render Topics in Display
$(document).on("click", ".topic-btn", displayTopicInfo);

// Initializer
renderButtons();