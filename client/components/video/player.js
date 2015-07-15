// videoPlayer.js

var VideoPlayerStyle = {

  width: "100%",
  height: "325"
};



var VideoPlayer = React.createClass({
 render: function() {
   return (
     <iframe style={VideoPlayerStyle} src="http://player.vimeo.com/video/54989781?api=1&player_id=player1" frameBorder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
   );
 }
});


// <video style={VideoPlayerStyle} width="614" height="350" src="http://vjs.zencdn.net/v/oceans.mp4" type="video/mp4" autoPlay loop></video>