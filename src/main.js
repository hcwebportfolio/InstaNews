$(function() {
  $('select').on('change', function() {

    $('header').switchClass(".headlarge", ".headsmall", 1000, "easeOutQuad");
    $('img').switchClass(".logolarge", ".logosmall", 1000, "easeOutQuad");
    // You were missing the . infront of the class names in the switchClass
    // statements above. I added them in and it lets the header and logo shrink
    // to how you had it styled in your SCSS. 

    $(".all-categories").empty();
    $('.loading').show();

    var select = $('.selection').val();
    $.ajax({

      method: 'GET',
      url: 'http://api.nytimes.com/svc/topstories/v1/' + select + '.json?api-key=766c9f7c67d153d7f4ae5f1861604d43:8:75124094'
    })

        .done(function(data) {
          if (data.results.length === 0) {
            $('.all-categories').append("<p>Sorry, nothing found! Please try again.</p>");
          }
          else {
              var nytData = data.results;
              nytData = nytData.filter(function(item) {
                  return item.multimedia.length;
              }).splice(0, 12);

              nytData.forEach(function(item, index) {

                  $('.all-categories').append('<div class="articlepics story-' + index + '"><div class="text"><a href="' + item.url + '"> ' + item.abstract + '</a></div></div>');

                  img = item.multimedia[4];
                  $('.story-' + index).css('background-image', 'url("' + img.url + '")');
                  });
                }
                }).always(function() {
                  $('.loading').hide();
              });
            });
});
