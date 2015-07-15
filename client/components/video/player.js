// videoPlayer.js

var VideoPlayerStyle = {
  width: "100%",
  height: "300px",
  pointerEvents: 'none'
};

var VideoPlayer = React.createClass({
  render: function() {
    return (
      <div className="videoContainer"><iframe style={VideoPlayerStyle} src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=0&showInfo=0&disablekb=1&enablejsapi=1&rel=0&modestbranding=1" frameBorder="0" ></iframe></div>    
    );
  }
});