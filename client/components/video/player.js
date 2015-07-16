// player.js

var VideoPlayer = React.createClass({
  render: function() {
    var style = {
      width: "100%",
      height: "50%",
      bottom: "0",
      border: '2px solid #444444'
      // pointerEvents: 'none' 
    };
    return (
      <div id="videoContainer" style={style}></div>    
    );
  }
});