// videoPlayer.js

var VideoPlayerStyle = {
  zIndex: -1,
  marginLeft: '25%',
  marginTop: '4px',
  border: '4px solid #222222',
  borderRadius: '2px',
  backgroundColor: '#000000'
};

var VideoPlayer = React.createClass({
 render: function() {
   return (
     <video style={VideoPlayerStyle} width="614" height="350" src="http://vjs.zencdn.net/v/oceans.mp4" type="video/mp4" autoPlay loop></video>
   );
 }
});