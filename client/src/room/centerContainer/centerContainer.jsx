var React = require('react');

var VideoPlayer = require('./video/player.jsx');
var Chat = require('./chat/chat.jsx');

var CenterContainer = React.createClass({
  render: function() {
    var style = {
      position: 'absolute',
      left: '20%',
      width: '60%',
      margin: '0px 0px 0px 0px',
      backgroundColor: '#222',
      top: '50px',
      bottom: '0px'
    };
    return (
      <div style={style}>
        <VideoPlayer />
        <Chat app={this.props.app}/>
      </div>
    );
  }
});

module.exports = CenterContainer;