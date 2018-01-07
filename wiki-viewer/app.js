function getWikiResults() {
  var searchTerm = $('input[type="text"]').val();
  $.ajax({
    type: 'GET',
    url: 'https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&list=search&srsearch=' + searchTerm,
    error: function(err) {
      console.log(err);
    },
    success: function(res) {
      var $retrieveResult = res.query.search;
      $('ul').html('');
      $retrieveResult.forEach(function(eachResult){
        $('ul').append('<li><a href="https://en.wikipedia.org/?curid=' + eachResult.pageid +'" target="_blank"><h3>' + eachResult.title + '</h3><p>' + eachResult.snippet + '</p></a></li>')
      });
    }
  });
}

$('input[type="text"]').on('keypress', function(event) {
  // if user presses Enter (keycode 13), get input value
  if (event.which === 13) {
    getWikiResults();
    $(this).val('');
  }
});
