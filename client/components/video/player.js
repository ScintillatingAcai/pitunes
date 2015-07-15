// videoPlayer.js

// var VideoPlayerStyle = {
//   width: "100%",
//   height: "300px",
// };

var VideoContainerStyle = {
  width: "100%",
  height: "305px",
  pointerEvents: 'none'
};

var VideoPlayer = React.createClass({
  render: function() {
    return (
      <div id="videoContainer" style={VideoContainerStyle}></div>    
    );
  }
});

// <iframe style={VideoPlayerStyle} src="https://www.youtube.com/embed/YfY1lfFu8j8?autoplay=1&controls=0&showInfo=0&disablekb=1&enablejsapi=1&rel=0&modestbranding=1&loop=1" frameBorder="0" ></iframe>

var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = false;
  ga.src = 'http://www.youtube.com/player_api';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);

  var done = false;
  var player;

  function onYouTubePlayerAPIReady() {
      player = new YT.Player('videoContainer', {
          height: '390',
          width: '640',
          videoId: 'PSYxT9GM0fQ',
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
  }
  function onPlayerReady(evt) {
      console.log('onPlayerReady', evt);
  }
  function onPlayerStateChange(evt) {
      console.log('onPlayerStateChange', evt);
      if (evt.data == YT.PlayerState.PLAYING && !done) {
          console.log('Heard state change')
      }
  }

  function stopVideo() {
      console.log('stopVideo');
      player.stopVideo();
  }
