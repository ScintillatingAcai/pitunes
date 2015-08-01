var React = require('react');

var Queue = require('./queue/queue.jsx');
var OnlineUsers = require('./users/users.jsx');

var RightContainer = React.createClass({
  render: function() {
    var style = {
      position: 'absolute',
      right: '0',
      width: '20%',
      margin: '0px 0px 0px 0px',
      backgroundColor: '#222',
      bottom: '0px',
      top: '50px'
    };
    return (
      <div className="rightContainer" style={style}>
        <Queue app={this.props.app}/>
        <OnlineUsers app={this.props.app}/>
      </div>
    );
  }
});

module.exports = RightContainer;