var $ = require('jquery');
var React = require('react'); 
var Backbone = require('backbone');

var TopNavBar = require('./topNavBar.jsx');
var BottomNavBar = require('./bottomNavBar.jsx');
var SignInModal = require('./signInModal.jsx');
var SignUpModal = require('./signUpModal.jsx');
var SignOutModal = require('./signOutModal.jsx');
var AppContainer = require('../app/app.jsx');

var server_uri = 'http://' + document.domain + ':3000',
  socket = io(server_uri);

var LoginController = React.createClass({
  getInitialState: function() {
    return { showSignIn: false, showSignUp: false, showSignOut: false, errorMessage: '' };
  },
  componentDidMount: function () {
    socket.emit('user room join', { user: app.get('user').attributes, room: this.props.params.room_id})
    app.get('current_room').set('id', this.props.params.room_id);
  },
  close: function() {
    console.log('close');
    this.setState({ showSignIn: false, showSignUp: false, showSignOut: false, errorMessage: '' });
  },
  signUpClick: function() {
    console.log('signUpClick')
    this.setState({ showSignIn: false, showSignUp: true, showSignOut: false });
  },
  signInClick: function() {
    console.log('signInClick')
    this.setState({ showSignIn: true, showSignUp: false, showSignOut: false });
  },
  signOutClick: function() {
    console.log('signOutClick')
    this.setState({ showSignIn: false, showSignUp: false, showSignOut: true });
  },
  signInUser: function() {
    var form = document.getElementById('signIn-form');
    var data = { email: form[0].value, password: form[1].value };
    var self = this;
    $.ajax({
      url: server_uri + '/api/users/login',
      type: 'POST',
      dataType: 'json',
      data: data,
      success: function (res) {
        app.get('user').set(res);
        app.get('user').retrievePlaylists();
        app.get('user').trigger('login');
        socket.emit('user room join', { user: app.get('user').attributes, room: self.props.params.room_id})
        app.get('current_room').set('id', self.props.params.room_id);
        self.close();
      },
      error: function (res) {
        self.setState({ errorMessage: res.statusText + ": " + res.responseText });
      }
    });
  },
  signUpUser: function() {
    var form = document.getElementById('signUp-form');
    var data = { email: form[0].value, password: form[1].value, password: form[2].value, displayName: form[3].value };
    var self = this;
    if (form[1].value !== form[2].value) { self.setState({ errorMessage: 'Your passwords did not match.' }); return; }
    $.ajax({
      url: server_uri + '/api/users/signup',
      type: 'POST',
      dataType: 'json',
      data: data,
      success: function(res) {
        app.get('user').set(res);
        app.get('user').retrievePlaylists();
        app.get('user').trigger('login');
        self.close();
      },
      error: function(res) {
        self.setState({ errorMessage: res.statusText + ': ' + res.responseText });
      }
    });
  },
  signOutUser: function() {
    var self = this;
    $.ajax({url: server_uri + '/api/users/logout',
      type: 'GET',
      success: function (res) {
        console.log('succeeded in logging out');
        self.close();
      },
      error: function (res) {
        console.error('error in user logout');
        self.setState({ errorMessage: res.statusText + ': ' + res.responseText });
      }
    });
  },
  render: function() {
    return (
      <div>
        <TopNavBar signInClick={this.signInClick} signOutClick={this.signOutClick} errorMessage={this.state.errorMessage}/>
        <BottomNavBar />
        <SignInModal close={this.close} signUpClick={this.signUpClick} signInUser={this.signInUser} showSignIn={this.state.showSignIn} errorMessage={this.state.errorMessage} />
        <SignUpModal close={this.close} signInClick={this.signInClick} signUpUser={this.signUpUser} showSignUp={this.state.showSignUp} errorMessage={this.state.errorMessage} />
        <SignOutModal close={this.close} signOutUser={this.signOutUser} showSignOut={this.state.showSignOut} />
        <AppContainer />
      </div>
    );
  }
});

module.exports = LoginController;
