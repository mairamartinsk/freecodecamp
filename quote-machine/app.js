function randomQuote() {
  var $quoteText = $('p');
  var $quoteAuthor = $('footer');

  $.ajax({
    type: 'GET',
    url: 'https://api.forismatic.com/api/1.0/',
    jsonp: 'jsonp',
    dataType: 'jsonp',
    data: {
      method: 'getQuote',
      lang: 'en',
      format: 'jsonp'
    },
    success: function(res) {
      $quoteText.text(res.quoteText);
      $quoteAuthor.text(res.quoteAuthor);
    },
    error: function(err) {
      console.log('Something went wrong!');
    }
  });
}

function backgroundColor() {
  // Generate random colors
  var randomColor1 = "#" + Math.floor(Math.random()*16777215).toString(16);
  var randomColor2 = "#" + Math.floor(Math.random()*16777215).toString(16);
  var gradient = 'radial-gradient(at top left, ' + randomColor1 + ', ' + randomColor2 + ')';

  $('body').css('background', gradient);
}

$(function () {
  randomQuote();
  backgroundColor();
});

$('.newQuote').on('click', function(){
  randomQuote();
  backgroundColor();
});

$('.tweetQuote').on('click', function(){
  var $quoteText = $('p').text();
  var $quoteAuthor = $('footer').text();

  window.open('https://twitter.com/intent/tweet?text=' + $quoteText);
});
