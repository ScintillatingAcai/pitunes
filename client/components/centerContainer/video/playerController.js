var ga = document.createElement('script');
ga.type = 'text/javascript';
ga.async = false;
ga.src = 'http://www.youtube.com/player_api';
var s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(ga, s);

// Stub for JSON object from server
var mediaStatus = {
  videoId: 'N9qYF9DZPdw',
  startSeconds: 0
};

var done = false;
var player;
var playerInstaniated = false;

var setVideoTime = function (time) {
  player.seekTo(time, true);
};

var serveStaticImg = function () {
  if ($('#noVideoImg')) {
    $('#noVideoImg').remove();
  }
  if ($('#videoContainer')) {
    $('#videoContainer').append('<div style="width:100%; height:100%; background-color:#000; text-align:center;" id="noVideoImg"><h1 style="color:#DDD">No current DJ</h1><h4 style="color:#DDD">Grab some friends and start a playlist!</h4></div>');
  }
};

var removeVideo = function () {
  player.destroy();
  playerInstaniated = false;
  serveStaticImg();
};

var createPlayer = function (currentVideoId) {
  playerInstaniated = true;
  player = new YT.Player('videoContainer', {
    height: '390',
    width: '640',
    videoId: currentVideoId,
    playerVars: {
      controls: 0,
      autoplay: 0,
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
  if (mediaStatus.videoId === null) {
    serveStaticImg();
  } else {
    createPlayer(mediaStatus.videoId);
  }
};

var onPlayerReady = function (evt) {
  console.log('heard onPlayerReady', evt);
  if (mediaStatus.startSeconds > 0) {
    setVideoTime(mediaStatus.startSeconds);
  }
};

// Socket Event Listener
socket.on('media status', function (data) {
  console.log(data);
  mediaStatus = data;
  heardNewMediaStatus();
});

var heardNewMediaStatus = function() {
  console.log('heardNewCVO fired');
  loadVideo(mediaStatus.videoId, mediaStatus.startSeconds);
};

// DEBUGGER FUNCTIONS
// * * *
var onPlayerStateChange = function (evt) {
  console.log('heard onPlayerStateChange', evt);
  if (evt.data === YT.PlayerState.PLAYING && !done) {
    console.log('Heard state change');
  }
};

var playVideo = function () {
  player.playVideo();
};

var stopVideo = function () {
  player.stopVideo();
};
// * * *
// END DEBUGGER FUNCTIONS

// Expects 11 character string (YouTube Video ID) and the starttime of video (0 if new)
var loadVideo = function (videoId, startSeconds) {
  if (playerInstaniated) {
    if (player.getVideoData().video_id !== videoId) {
      player.loadVideoById(videoId, startSeconds);
    } else {
      console.log('media time difference: ',mediaStatus.startSeconds - player.getCurrentTime());
      if (mediaStatus.startSeconds - player.getCurrentTime() > 10) {
        console.log('Syncing client video to master server time...');
        setVideoTime(mediaStatus.videoTime);
      }
    }
  } else {
    playerInstaniated = true;
    player = new YT.Player('videoContainer', {
      height: '390',
      width: '640',
      videoId: videoId,
      startSeconds: startSeconds,
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