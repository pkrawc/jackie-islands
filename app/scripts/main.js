'use strict';

var soundCloudTemplate = $('#sound-cloud-template').html();

function addSongs(song) {
  $('.song-list').append(Mustache.render(soundCloudTemplate, song));

  console.log(song.artwork_url);
}

var soundCloudCall = function(){

  var def = $.Deferred();

  SC.initialize({
    client_id: '38420d37956ecca4db2adfc516c1a534',
  });

  SC.get('/users/121957391/tracks', function(songs){
    $.each(songs, function(i, song){
      song.artwork_url = song.artwork_url.replace('-large', '-t500x500');
      addSongs(song);
    });
  });

  setTimeout(function(){
    def.resolve();
  }, 1000);

  return def;
};

var parsingResponse = function(){

  var musicArray = $('.track').toArray();

  $.each(musicArray, function(index, track){

    // console.log(track);

    if (index === 0) {
      $(track).addClass('playing');

      var imgSrc = $(track).data('artwork');
      var artworkImage = $('.artwork-image');

      $(artworkImage).attr('src', imgSrc);
      artworkImage.delay(600).css('opacity', '1');
    }

    // console.log(imgSrc);

    // var playButton = $(this).find('.play-toggle');
    // $(playButton).attr('src', 'images/play.svg');
    //
    // $(musicCard).find('.play-toggle').click(function(){
    //   if ($(this).hasClass('playing')){
    //     $(this).siblings('audio').trigger('pause');
    //     $(this).siblings('audio').prop('currentTime', 0);
    //     $(this).removeClass('playing');
    //     $(this).attr('src', 'images/play.svg');
    //   } else {
    //     $(this).siblings('audio').trigger('play');
    //     $(this).addClass('playing');
    //     $(this).attr('src', 'images/pause.svg');
    //   }
    // });
  });
};

$(document).ready(function(){
  soundCloudCall().done(parsingResponse);
});
