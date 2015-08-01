var ga = document.createElement('script');
ga.type = 'text/javascript';
ga.async = false;
ga.src = 'https://www.youtube.com/player_api';
var s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(ga, s);

var socket = io(window.location.origin);

// Default Media Status
var mediaStatus = {
  videoId: "",
  startSeconds: 0
};

var done = false;
var player;

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
  if (player) {
    player.destroy();
    player = null;
  }
  serveStaticImg();
};

// Instantiate player and load mediastatus videoID/start playing video
var createPlayer = function (currentVideoId) {
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
    }
  });
};

// Start playing video at MSO's startSeconds time after play loads
var onPlayerReady = function (evt) {
    setVideoTime(mediaStatus.startSeconds);
};

// Socket Event Listener for Media Status Object for
socket.on('media status', function (data) {
  mediaStatus = data;
  heardNewMediaStatus();
});

// Wrapper for loadVideo/serveStaticImg
var heardNewMediaStatus = function () {
  if (!mediaStatus || !mediaStatus.videoId) {
    removeVideo();
  } else {
    loadVideo(mediaStatus.videoId, mediaStatus.startSeconds);
  }
};

// Main Load Video
// Expects 11 character string (YouTube Video ID) and the starttime of video
var loadVideo = function (videoId, startSeconds) {
  // If no player in room, reinstaniate it
  if (player) {
    // Load new player if current video is different from new video or same video is being played again
    if ((player.getVideoData().video_id !== videoId) || mediaStatus.status === 'start') {
      player.loadVideoById(videoId, startSeconds);
    } else {
      // If same video, check if desync is greater than 10 seconds
      if (mediaStatus.startSeconds - player.getCurrentTime() > 2) {
        setVideoTime(startSeconds);
      }
    }
  } else {
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
      }
    });
  }
};