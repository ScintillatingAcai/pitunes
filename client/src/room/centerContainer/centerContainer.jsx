var React = require('react');

var VideoPlayer = require('./video/player.jsx');
var Chat = require('./chat/chat.jsx');

var CenterContainer = React.createClass({
  render: function() {
    var style = {
      position: 'absolute',
      left: '25%',
      width: '50%',
      margin: '0px 0px 0px 0px',
      backgroundColor: '#F8F8F8',
      border: '1px solid #333',
      bottom: '33px',
      top: '50px'
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