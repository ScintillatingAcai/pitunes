// rightContainer.js

var RightContainer = React.createClass({
  render: function() {
    var style = {
      position: 'absolute',
      right: '0',
      minHeight: '88%',
      width: '25%',
      margin: '0px 0px 0px 0px',
      backgroundColor: '#222222',
      border: '2px solid #444444',
      bottom: '4%'
    };
    return (
      <div className="rightContainer" style={style}>
        <QueueContainer />
        <UserContainer />
      </div>
    );
  }
});