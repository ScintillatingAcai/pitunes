var VideoBox = React.createClass({
  render: function() {
    return (
      <VideoPlayer />
    );
  }
});

var ChatBox = React.createClass({
  render: function() {
    return (
      <Chat />
    );
  }
});

var CenterContainer = React.createClass({
  render: function() {
    var style = {
      position: 'absolute',
      left: '25%',
      height: '90%',
      width: '50%',
      margin: '1px 0px 0px 0px',
      backgroundColor: '#222222',
      border: '2px solid #444444',
      borderRadius: '2px'
    };
    return (
      <div style={style}>
        <VideoBox />
        <ChatBox />
      </div>
    );
  }
});