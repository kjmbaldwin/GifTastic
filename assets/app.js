var gifButtons = [];

function renderButtons(){
  $('#buttons').empty();

  for (var i = 0; i < gifButtons.length; i++) {
    // $('#movies-view').append("<button>" + movies[i] + '</button>');
    var button = $('<button>').addClass('btn btn-success gif-button');
    button.attr('data-search-term', gifButtons[i]).text(gifButtons[i]);
    $('#buttons').append(button);
  }
}

$('#add-button').on('click', function(event){ 
  event.preventDefault();

  var newGif = $('#gif-input').val().trim();

  if(newGif){
    gifButtons.push(newGif);
    $('#gif-input').val('');
    renderButtons();
  }
});

$(document).on('click', '.gif-button', function(){ 
  var search = $(this).attr('data-search-term');
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=Hvz2S5G7r8nKIosJmCW4GNAhRikZhiHa&limit=10";

  $.ajax({
    url: queryURL,
    method: 'GET'
  })
  .done(function(response){ 
    var results = response.data;

    for (var j = 0; j < results.length; j++){
      var $gifDiv = $('<div class="gif-result">')
      var $rating = $('<p>').text("Rating: " + results[j].rating);
      var $gif = $('<img>').addClass('gif').attr("src", results[j].images.fixed_height_still.url);
      $gif.attr('data-still', results[j].images.fixed_height_still.url);
      $gif.attr('data-animate', results[j].images.fixed_height.url);
      $gif.attr('data-state', 'still');

      $gifDiv.prepend($gif);
      $gifDiv.append($rating);

      $('#load-gifs').prepend($gifDiv);
    }
  });
});

$(document).on('click', '.gif', function(){
  var state = $(this).attr('data-state');

  if (state == 'still'){
    $(this).attr('src', $(this).attr('data-animate'));
    $(this).attr('data-state', 'animate');
  }

  if (state == 'animate'){
    $(this).attr('src', $(this).attr('data-still'));
    $(this).attr('data-state', 'still');
  }
});





