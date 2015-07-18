// mediaAddController.js

var searchYouTube = function (query) {
  var encodedQuery = encodeURIComponent(query);
  var searchUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + encodedQuery + YOUTUBE_API_KEY;
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
      // var durationSearchUrl = 'https://www.googleapis.com/youtube/v3/videos?id=' + videoIds + '&part=contentDetails' + YOUTUBE_API_KEY;
      results.forEach(function (e) {
        $('#searchResults').append('<li class="searchResultItem"><img className="searchResultImg" data-id="' + e.id + '"style="height:50px; width:50px" src="' + e.img + '" /><p className="searchResultTitle">' + e.title + '</p></li>');
      });
      $(".searchResultItem").on('click', function (e) {
        loadVideo($(e.target).attr('data-id'), 0);
      });
    }
  });
};