var ga = document.createElement('script');
ga.type = 'text/javascript';
ga.async = false;
ga.src = 'http://www.youtube.com/player_api';
var s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(ga, s);

// Stub for JSON object from server
var currentVideoStub = {
  videoId: 'PsO6ZnUZI0g',
  // videoId: null,
  videoPosition: 0
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
    $('#videoContainer').append('<img style="width:100%; height:100%;" id="noVideoImg" src="/assets/img/placeholder.jpeg" />');
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
  if (currentVideoStub.videoId === null) {
    serveStaticImg();
  } else {
    createPlayer(currentVideoStub.videoId);
  }
};

var onPlayerReady = function (evt) {
  console.log('heard onPlayerReady', evt);
  $(document).on('newCVO', function () {
    heardNewCVO();
  });
  if (currentVideoStub.videoPosition > 0) {
    setVideoTime(currentVideoStub.videoPosition);
  }
};

var heardNewCVO = function() {
  console.log('heardNewCVO fired');
  loadVideo(currentVideoStub.videoId, currentVideoStub.videoPosition);
};

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

// Expects 11 character string (YouTube Video ID)
var loadVideo = function (videoId, startTime) {
  console.log('loadvideo fired');
  if (playerInstaniated) {
    if (player.getVideoData().video_id !== videoId) {
      console.log('instaniated and dif video id');
      player.loadVideoById(videoId, startTime);
    } else {
      if (player.getCurrentTime() - currentVideoStub.videoPosition > 5) {
        console.log('Client player too desynced, syncing');
        setVideoTime(currentVideoStub.videoTime);
      }
    }
  } else {
    player = new YT.Player('videoContainer', {
      height: '390',
      width: '640',
      videoId: videoId,
      startSeconds: startTime,
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
    playerInstaniated = true;
  }
};