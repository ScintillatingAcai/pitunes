var ga = document.createElement('script');
ga.type = 'text/javascript';
ga.async = false;
ga.src = 'http://www.youtube.com/player_api';
var s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(ga, s);

var user = null, 
  room = 'root', 
  server_uri = 'http://' + document.domain + ':3000',
  socket = io(server_uri);

// Stub for JSON object from server
var mediaStatus = {
  videoId: "",
  startSeconds: 0
};

var done = false;
var player;
var playerInstaniated = false;

// Initialize player if user joins room and video is currently playing or serve static message if not
var onYouTubePlayerAPIReady = function () {
  if (!mediaStatus.videoId) {
    serveStaticImg();
  } else {
    createPlayer(mediaStatus.videoId);
  }
};

var setVideoTime = function (time) {
  player.seekTo(time, true);
};

// Serve "No current DJ" Message
var serveStaticImg = function () {
  if ($('#noVideoImg')) {
    $('#noVideoImg').remove();
  }
  if ($('#videoContainer')) {
    $('#videoContainer').append('<div style="width:100%; height:100%; background-color:#000; text-align:center;" id="noVideoImg"><h1 style="color:#DDD">No current DJ</h1><h4 style="color:#DDD">Grab some friends and start a playlist!</h4></div>');
  }
};

// Destroy the player and serve "No current DJ" Message
var removeVideo = function () {
  player.destroy();
  playerInstaniated = false;
  serveStaticImg();
};

// Instantiate player and load mediastatus videoID/start playing video
var createPlayer = function (currentVideoId) {
  playerInstaniated = true;
  player = new YT.Player('videoContainer', {
    // TODO Tweak these or dynamically generate based on page size
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
      // TODO Temp for testing
      'onStateChange': onPlayerStateChange
    }
  });
};

// Start playing video at MSO's startSeconds time after play loads
var onPlayerReady = function (evt) {
  console.log('heard onPlayerReady', evt);
    setVideoTime(mediaStatus.startSeconds);
};

// TODO - Discuss w/Kyle the format of what client should expect to recieve/message codes and refactor accordingly
// Socket Event Listener for Media Status Object for
socket.on('media status', function (data) {
  console.log('media status: ', mediaStatus);
  mediaStatus = data;
  heardNewMediaStatus();
});

// Wrapper for loadVideo/serveStaticImg
var heardNewMediaStatus = function () {
  if (!mediaStatus || !mediaStatus.videoId) {
    // serveStaticImg();
    removeVideo();
  } else {
    loadVideo(mediaStatus.videoId, mediaStatus.startSeconds);
  }
};

// DEBUGGER FUNCTIONS
// TODO Remove before production
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

// Main Load Video
// Expects 11 character string (YouTube Video ID) and the starttime of video
var loadVideo = function (videoId, startSeconds) {
  // If player already exists...
  if (playerInstaniated) {
    // Load new player if current video is different from new video or same video is being played again

    if ((player.getVideoData().video_id !== videoId) || mediaStatus.status === 'start') {
      player.loadVideoById(videoId, startSeconds);
    } else {
      // If same video, check if desync is greater than 10 seconds
      console.log("media timer dif: ", mediaStatus.startSeconds - player.getCurrentTime());
      if (mediaStatus.startSeconds - player.getCurrentTime() > 10) {
        setVideoTime(startSeconds);
      }
    }
  // If no player in room, reinstaniate it
  } else {
    playerInstaniated = true;
    player = new YT.Player('videoContainer', {
      // TODO Tweak these or dynamically generate based on page size
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
        // TODO Temp for testing
        'onStateChange': onPlayerStateChange
      }
    });
  }
};