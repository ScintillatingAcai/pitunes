var CenterContainer = React.createClass({
  render: function() {
    var style = {
      position: 'absolute',
      left: '25%',
      height: '88%',
      width: '50%',
      margin: '0px 0px 0px 0px',
      backgroundColor: '#222222',
      border: '2px solid #444444',
      bottom: '4%'
    };
    return (
      <div style={style}>
        <VideoContainer />
        <ChatContainer />
      </div>
    );
  }
});