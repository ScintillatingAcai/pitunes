var UserBox = React.createClass({
  render: function() {
    return (
      <OnlineUsers/>
    );
  }
});

var QueueBox = React.createClass({
  render: function() {
    return (
      <Queue />
    );
  }
});
var RightContainer = React.createClass({
  render: function() {
    var style = {
      position: 'absolute',
      right: '0',
      minHeight: '90%',
      width: '25%',
      margin: '1px 0px 0px 0px',
      backgroundColor: '#222222',
      border: '2px solid #444444',
      borderRadius: '2px'
    };
    return (
      <div className="rightContainer" style={style}>
        <QueueBox />
        <UserBox />
      </div>
    );
  }
});