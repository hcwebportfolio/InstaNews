$(function() {
  $('select').on('change', function() {

    $.ajax({

      method: 'GET',
      url: 'http://api.nytimes.com/svc/topstories/v1/world.json?api-key=766c9f7c67d153d7f4ae5f1861604d43:8:75124094'
    })

        .done(function(data) {
          console.log(data);
              var nytData = data.results;
              nytData = nytData.filter(function(item) {
                  return item.multimedia.length;
              }).splice(0, 12);

              nytData.forEach(function(item, index) {
                console.log(item);
                  $('.all-categories').append('<div class="articlepics story-' + index + '"><div class="text"><a href="' + item.url + '"> ' + item.abstract + '</a></div></div>');

                  img = item.multimedia[4];
                  $('.story-' + index).css('background-image', 'url("' + img.url + '")');
                  });
                });
              });
});
