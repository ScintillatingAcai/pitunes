var ga = document.createElement('script');
ga.type = 'text/javascript';
ga.async = false;
ga.src = 'http://www.youtube.com/player_api';
var s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(ga, s);

// Stub for JSON object from server
var currentVideoStub = {
  videoId: 'ETfiUYij5UE',
  videoPosition: 30
};

var done = false;
var player;
var playerInstaniated = false;


var setVideoTime = function (time) {
  player.seekTo(time, true);
};

var createPlayer = function (currentVideoId) {
  playerInstaniated = true;
  player = new YT.Player('videoContainer', {
      height: '390',
      width: '640',
      videoId: currentVideoId,
      playerVars: {
        controls: 0,
        autoplay: 1,
        disablekb: 1,
        showInfo: 0,
        enablejsapi: 1,
        rel: 1,
        modestbranding: 1
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
  });
};

var onYouTubePlayerAPIReady = function () {
  createPlayer(currentVideoStub.videoId);
};

var onPlayerReady = function (evt) {
  console.log('heard onPlayerReady', evt);
  setVideoTime(currentVideoStub.videoPosition);
};

var onPlayerStateChange = function (evt) {
  console.log('heard onPlayerStateChange', evt);
  if (evt.data === YT.PlayerState.PLAYING && !done) {
    console.log('Heard state change');
  }
};

var playVideo = function () {
  console.log('playVideo fired');
  player.playVideo();
};

var stopVideo = function () {
  console.log('stopVideo fired');
  player.stopVideo();
};

// Expects 11 character string (YouTube Video ID)
var loadVideo = function (videoId, startTime) {
  // console.log('loadVideo (id#' + videoId + ') fired');
  console.log(playerInstaniated);
  if (playerInstaniated) {
    player.loadVideoById(videoId);
  } else {
    player = new YT.Player('videoContainer', {
      height: '390',
      width: '640',
      videoId: videoId,
      startSeconds: '30',
      playerVars: {
        controls: 0,
        autoplay: 1,
        disablekb: 1,
        showInfo: 0,
        enablejsapi: 1,
        rel: 0,
        modestbranding: 1
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }
};

var removeVideo = function () {
  console.log('fired removeVideo');
  player.destroy();
  playerInstaniated = false;
  if ($('#noVideoImg')) {
    $('#noVideoImg').remove();
  }
  if ($('#videoContainer')) {
    $('#videoContainer').append('<img style="width:100%; height:100%;" id="noVideoImg" src="/assets/img/placeholder.jpeg" />');
  }
};