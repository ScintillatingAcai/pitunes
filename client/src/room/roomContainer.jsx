var React = require('react');

var AppModel = require('../data/models/app.js');
var LeftContainer = require('../room/leftContainer/leftContainer.jsx');
var CenterContainer = require('../room/centerContainer/centerContainer.jsx');
var RightContainer = require('../room/rightContainer/rightContainer.jsx');

var server_uri = 'http://' + document.domain + ':3000',
  socket = io(server_uri);

var AppContainer = React.createClass({
  getInitialState: function() {
    return { showSignIn: false, showSignUp: false, showSignOut: false, errorMessage: '' };
  },
  componentDidMount: function () {
    socket.emit('user room join', { user: this.props.app.get('user').attributes, room: this.props.room_id});
    this.props.app.get('current_room').set('id', this.props.room_id);
  },
  render: function () {
    var style = {
      WebkitTouchCallout: 'none',
      WebkitUserSelect: 'none',
      KhtmlUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none',
      userSelect: 'none'
    };
    return (
      <div style={style}>
        <LeftContainer app={this.props.app}/>
        <CenterContainer app={this.props.app}/>
        <RightContainer app={this.props.app}/>
      </div>
    );
  }
});

module.exports = AppContainer;
