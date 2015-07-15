// videoPlayer.js

var VideoPlayerStyle = {
  width: "100%",
  height: "325"
};

var VideoPlayer = React.createClass({
  render: function() {
    return (
      <iframe style={VideoPlayerStyle} src="https://www.youtube.com/embed/2HQaBWziYvY" frameBorder="0" ></iframe>    
    );
  }
});