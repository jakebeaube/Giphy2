$( document ).ready(function() 
{
    // Cartoon array. User inputs will be pushed to array
    var cartoons = ["Smurfs", "Snorks", "He-Man", "Thundercats", "Real Ghostbusters", "Garfield", "Super Friends", "Muppet Babies", "Darkwing Duck", "Looney Tunes","TMNT", ];
    // Creating Functions & Methods
    // Displays all buttons
    function displayGifButtons()
        {
            $("#gifButtonsView").empty(); // erasing anything in this div id so that it doesnt duplicate the results
            for (var i = 0; i < cartoons.length; i++)
            {
                var gifButton = $("<button>");
                gifButton.addClass("cartoon");
                gifButton.addClass("btn btn-warning")
                gifButton.attr("data-name", cartoons[i]);
                gifButton.text(cartoons[i]);
                $("#gifButtonsView").append(gifButton);
            }
        }
    // Function to add a new action button
    function addNewButton()
        {
            $("#addGif").on("click", function()
            {
                var cartoon = $("#cartoon-input").val().trim();
                if (cartoon == ""){
                return false; // added so user cannot add a blank button
            }
            cartoons.push(cartoon);

            displayGifButtons();
            return false;
        });
    }
    // Removes user added buttons
   
    function removeButton()
    {
        $("removeGif").on("click", function()
        {
            cartoons.pop(cartoon);
            displayGifButtons();
            return false;
        });
    }
    // Function that displays all of the gifs
    function displayGifs()
        {
        var cartoon = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + cartoon + "&api_key=dc6zaTOxFJmzC&limit=12";
        console.log(queryURL); // displays the constructed url
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) 
            {
                //console.log(response); // console test to make sure something returns
                $("#gifsView").empty(); // erasing anything in this div id so that it doesnt keep any from the previous click
                var results = response.data; //shows results of gifs
                if (results == ""){
                alert("Congratulations, there's no GIF for your obscure cartoon!");
            }
                for (var i=0; i<results.length; i++)
            {

                var gifDiv = $("<div>"); //div for the gifs to go inside
                gifDiv.addClass("gifDiv");
                // pulling rating of gif
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);
                // pulling gif
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
                gifImage.attr("data-state", "still"); // set the image state
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                // pulling still image of gif
                // adding div of gifs to gifsView div
                $("#gifsView").prepend(gifDiv);
            }
        });
    }
    // Calling Functions & Methods
    displayGifButtons(); // displays list of action already created
    addNewButton();
    removeButton();
        // Document Event Listeners
        $(document).on("click", ".cartoon", displayGifs);
        $(document).on("click", ".image", function()
        {
            var state = $(this).attr('data-state');
            if ( state == 'still')
            {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
            }
        else
            {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
});