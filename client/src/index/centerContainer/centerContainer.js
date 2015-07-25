var CenterContainer = React.createClass({
  render: function() {
    var style = {
      position: 'absolute',
      left: '25%',
      width: '50%',
      margin: '0px 0px 0px 0px',
      backgroundColor: '#F8F8F8',
      border: '1px solid #e7e7e7',
      bottom: '52px',
      top: '50px'
    };
    return (
      <div style={style}>
        <VideoContainer />
        <ChatContainer />
      </div>
    );
  }
});