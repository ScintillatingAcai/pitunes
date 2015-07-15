var RightContainerStyle = {
  position: 'absolute',
  right: 0,
  minHeight: '90%',
  width: '25%',
  margin: '1px 0px 0px 0px',
  backgroundColor: '#222222',
  border: '2px solid #444444',
  borderRadius: '2px'
};

var UserBox = React.createClass({
  render: function() {
    return (
      <OnlineUsers/>
    );
  }
});

var RightContainer = React.createClass({
  render: function() {
    return (
      <div className="rightContainer" style={RightContainerStyle}>
        <UserBox />
      </div>
    );
  }
});