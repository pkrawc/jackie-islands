'use strict';

$(document).ready(function(){

  var soundCloudTemplate = $('#sound-cloud-template').html();

  function addSongs(song) {
    $('.music-content').append(Mustache.render(soundCloudTemplate, song));
  }

  var soundCloudCall = function(){

    var def = $.Deferred();

    SC.initialize({
      client_id: '38420d37956ecca4db2adfc516c1a534',
    });

    SC.get('/users/121957391/tracks', function(songs){
     $.each(songs, function(i, song){
       addSongs(song);
     });
    });

    setTimeout(function(){
      def.resolve();
    }, 1000);

    return def;
  };

  var parsingResponse = function(){
    var musicArray = $('.song-card').toArray();
    var songArray = $('audio').toArray();
    $(songArray[0]).trigger('play');

    $.each(musicArray, function(index, musicCard){

      if (index === 0) {
        var firstPlayButton = $(this).find('.play-toggle');
        $(firstPlayButton).attr('src', 'images/pause.svg');
        $(firstPlayButton).addClass('playing');
      } else {
        var playButton = $(this).find('.play-toggle');
        $(playButton).attr('src', 'images/play.svg');
      }

      $(musicCard).find('.play-toggle').click(function(){
        if ($(this).hasClass('playing')){
          $(this).siblings('audio').trigger('pause');
          $(this).siblings('audio').prop('currentTime', 0);
          $(this).removeClass('playing');
          $(this).attr('src', 'images/play.svg');
        } else {
          $(this).siblings('audio').trigger('play');
          $(this).addClass('playing');
          $(this).attr('src', 'images/pause.svg');
        }
      });
    });
  };

  soundCloudCall().done(parsingResponse);

});
