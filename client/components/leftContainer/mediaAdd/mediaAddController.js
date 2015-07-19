// mediaAddController.js

var convertYTDuration = function(duration) {
  var a = duration.match(/\d+/g);

  if (duration.indexOf('M') >= 0 && duration.indexOf('H') === -1 && duration.indexOf('S') === -1) {
      a = [0, a[0], 0];
  }
  if (duration.indexOf('H') >= 0 && duration.indexOf('M') === -1) {
      a = [a[0], 0, a[1]];
  }
  if (duration.indexOf('H') >= 0 && duration.indexOf('M') === -1 && duration.indexOf('S') === -1) {
      a = [a[0], 0, 0];
  }

  duration = 0;
  if (a.length === 3) {
    duration = duration + parseInt(a[0]) * 3600;
    duration = duration + parseInt(a[1]) * 60;
    duration = duration + parseInt(a[2]);
  }
  if (a.length === 2) {
    duration = duration + parseInt(a[0]) * 60;
    duration = duration + parseInt(a[1]);
  }
  if (a.length === 1) {
    duration = duration + parseInt(a[0]);
  }
  return duration;
};

var convertYTDurationDisplay = function (duration) {
  var minutes = Math.floor(duration / 60) + "";
  if (minutes.length === 1) {
    minutes = "0" + minutes;
  }
  var seconds = duration % 60 + "";
  if (seconds.length === 1) {
    seconds = "0" + seconds;
  }
  return minutes + ":" + seconds;
}

var searchYouTube = function (query) {
  var encodedQuery = encodeURIComponent(query);
  var searchUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&order=viewCount&q=' + encodedQuery + YOUTUBE_API_KEY;
  $.ajax({
    type: "GET",
    url: searchUrl,
    success: function (response) {
      var results = [];
      var resultsIds = [];
      response.items.forEach(function (e) {
        if (e.id.videoId) {
          results.push({
            img: e.snippet.thumbnails.default.url,
            title: e.snippet.title,
            id: e.id.videoId
          });
          resultsIds.push(e.id.videoId);
        }
      });
      var videoIds = "";
      for (var i = 0; i < results.length; i++) {
        videoIds += results[i].id + ',';
      }
      var videoMap = {};
      var durationSearchUrl = 'https://www.googleapis.com/youtube/v3/videos?id=' + videoIds + '&part=contentDetails' + YOUTUBE_API_KEY;
      $.ajax({
        type: "GET",
        url: durationSearchUrl,
        success: function (response) {
          response.items.forEach(function (e) {
            videoMap[e.id] = e.contentDetails.duration;
          });
          for (var j = 0; j < results.length; j++) {
            results[j].duration = convertYTDuration(videoMap[results[j].id]);
            results[j].durationDisplay = convertYTDurationDisplay(results[j].duration);
          }
          $(".searchResultItem").remove();
          console.log(results);
          results.forEach(function (e) {
            $('#searchResults').append('<li class="searchResultItem" style="margin-bottom:10px; margin-left:-30px; list-style:none;"><img className="searchResultImg" data-durationDisplay="' + e.durationDisplay + '" data-duration="' + e.duration + '" data-title="' + e.title + '" data-id="' + e.id + '" style="height:50px; width:50px; margin-right:5px;" src="' + e.img + '" /><div className="searchResultTitle" style="color:#FFF; font-size:10px; display:inline;"> ' + (e.title).slice(0, 35) + '...' + '</div><div style="color:#FFF; font-size:10px; display:inline;"> | ' + e.durationDisplay + '</div></li>');
          });
          $(".searchResultItem").on('click', function (e) {
            loadVideo($(e.target).attr('data-id'), 0);
            addSongToPlaylist({title: $(e.target).attr('data-title'), id: $(e.target).attr('data-id'), duration: $(e.target).attr('data-duration'), durationDisplay: $(e.target).attr('data-durationDisplay')});
          });
        }
      });
    }
  });
};