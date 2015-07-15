// player.js

var VideoPlayer = React.createClass({
  render: function() {
    var style = {
      width: "100%",
      height: "50%",
      border: '2px solid #444444'
      // pointerEvents: 'none' 
    };
    return (
      <div id="videoContainer" style={style}></div>    
    );
  }
});

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
          videoId: '1Xhdy9zBEws',
      playerVars: {
          controls: 0,
          // autoplay: 1,
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