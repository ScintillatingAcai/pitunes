var React = require('react');

var Queue = require('./queue/queue.jsx');
var OnlineUsers = require('./users/users.jsx');

var RightContainer = React.createClass({
  render: function() {
    var style = {
      position: 'absolute',
      right: '0',
      width: '25%',
      margin: '0px 0px 0px 0px',
      backgroundColor: '#F8F8F8',
      border: '1px solid #e7e7e7',
      bottom: '52px',
      top: '50px'
    };
    return (
      <div className="rightContainer" style={style}>
        <Queue />
        <OnlineUsers />
      </div>
    );
  }
});

module.exports = RightContainer;