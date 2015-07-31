var React = require('react');

var AppModel = require('../data/models/app.js');
var LeftContainer = require('../room/leftContainer/leftContainer.jsx');
var CenterContainer = require('../room/centerContainer/centerContainer.jsx');
var RightContainer = require('../room/rightContainer/rightContainer.jsx');
var socket = io(window.location.origin);

var RoomContainer = React.createClass({
  getInitialState: function() {
    return { showSignIn: false, showSignUp: false, showSignOut: false, errorMessage: '' };
  },
  componentWillMount: function () {
    this.props.app.setCurrentRoom(this.props.room_id);

    this.props.app.on('userSignInOut', this.updateForSignInStatus);
    this.updateForSignInStatus();

  },
  componentWillUnmount: function () {
    socket.emit('user room leave', { user: this.props.app.get('user').attributes, room: this.props.room_id});

    this.props.app.setCurrentRoom(false); //this will update currentroom to defaults

    this.props.app.off('userSignInOut');

  },
  updateForSignInStatus: function () {
    if (this.props.app.isSignedIn()) {
      console.log('room setup for user signed in: PROPS: ', this.props);
      socket.emit('user room join', { user: this.props.app.get('user').attributes, room: this.props.room_id });
    } else {
      console.log('room setup for user signed out: PROPS: ', this.props);
      socket.emit('user room join', { user: this.props.app.get('user').attributes, room: this.props.room_id });
    }
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

module.exports = RoomContainer;
