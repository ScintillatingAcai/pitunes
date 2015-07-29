var $ = require('jquery');
var React = require('react');
var Backbone = require('backbone');

var AppContainer = require('../room/roomContainer.jsx');

var server_uri = 'http://' + document.domain + ':3000',
  socket = io(server_uri);

var LoginController = React.createClass({
  getInitialState: function() {
    return { showSignIn: false, showSignUp: false, showSignOut: false, errorMessage: '' };
  },
  componentDidMount: function () {
    socket.emit('user room join', { user: this.props.app.get('user').attributes, room: this.props.room_id});
    this.props.app.get('current_room').set('id', this.props.room_id);
  },
  render: function() {
    return (
      <div>
        <AppContainer app={this.props.app}/>
      </div>
    );
  }
});

module.exports = LoginController;
