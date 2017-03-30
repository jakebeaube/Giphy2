$( document ).ready(function() {
    //default array, user should be able to push theirs too 
    var cartoons = ["He-Man", "Real Ghostbusters", "Darkwing Duck", "Super Friends", "Smurfs", "Snorks", "TMNT", "Looney Tunes", "GI Joe"];
    // Creating Functions & Methods
    // Displays gif buttons
    function displayGifButtons(){
        $("#gifButtonsView").empty(); 
        // erases div id
        for (var i = 0; i < cartoons.length; i++){
            var gifButton = $("<button>");
            gifButton.addClass("cartoon");
            gifButton.addClass("btn btn-warning")
            gifButton.attr("data-name", cartoons[i]);
            gifButton.text(cartoons[i]);
            $("#gifButtonsView").append(gifButton);
        }
    }
    // add new button, not working, was, but not now pls help...
    function addNewButton(){
        $("#addGif").on("click", function(){
        var cartoon = $("#cartoon-input").val().trim();
        if (cartoon == ""){
        return false; 
        // Can't leave field blank
        }
        cartoons.push(cartoon);

        displayGifButtons();
        return false;
        });
    }
    // Removes last button, not sure if working because add button not working
    
    function removeLastButton(){
        $("removeGif").on("click", function(){
        cartoons.pop(cartoon);
        displayGifButtons();
        return false;
        });
    }
    // Displays GIFs
    function displayGifs(){
        var cartoon = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + cartoon + "&api_key=dc6zaTOxFJmzC&limit=12";
        console.log(queryURL);
        // logs requested URL
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            console.log(response); 

            $("#gifsView").empty(); 
            // erasases div id
            var results = response.data; 
            //shows results
            if (results == ""){
            alert("Congratulations! There's no GIF for your obscure reference");
            }
            for (var i=0; i<results.length; i++){

                var gifDiv = $("<div>"); 
                //Div for gifs
                gifDiv.addClass("gifDiv");
                // pulls rating
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);
                // pulling gif
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
                gifImage.attr("data-state", "still"); 
                // set the image state
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                // pulling still image 
            
                $("#gifsView").prepend(gifDiv);
            }
        });
    }
    // Calling Functions & Methods
    displayGifButtons(); 
    // buttons created
    addNewButton();
    removeLastButton();
    
    $(document).on("click", ".cartoon", displayGifs);
    $(document).on("click", ".image", function(){
        var state = $(this).attr('data-state');
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }
        else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
        }
    });
});