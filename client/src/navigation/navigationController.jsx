var $ = require('jquery');
var React = require('react');
var Backbone = require('backbone');

var TopNavBar = require('./topNavBar.jsx');
var BottomNavBar = require('./bottomNavBar.jsx');
var SignInModal = require('./signInModal.jsx');
var SignUpModal = require('./signUpModal.jsx');
var SignOutModal = require('./signOutModal.jsx');

var server_uri = window.location.origin;
var socket = io(server_uri);

var NavigationController = React.createClass({
  getInitialState: function () {
    return { showSignIn: false, showSignUp: false, showSignOut: false, errorMessage: '', userLoggedIn: false };
  },
  componentDidMount: function () {
    var context = this;
    if (this.props.app.get('user').get('id')) {
      context.setState({ userLoggedIn: true });
    }
    $('body').on('click', '#landing-signin', function() {
      context.signInClick();
    });
    $('body').on('click', '#landing-signup', function() {
      context.signUpClick();
    });
  },
  close: function () {
    console.log('close');
    this.setState({ showSignIn: false, showSignUp: false, showSignOut: false, errorMessage: '' });
  },
  signUpClick: function () {
    console.log('signUpClick')
    this.setState({ showSignIn: false, showSignUp: true, showSignOut: false });
  },
  signInClick: function () {
    console.log('signInClick');
    if (this.state.userLoggedIn) {
      this.setState({ showSignIn: false, showSignUp: false, showSignOut: true });
    } else {
      this.setState({ showSignIn: true, showSignUp: false, showSignOut: false });
    }

  },
  signOutClick: function () {
    console.log('signOutClick')
    this.setState({ showSignIn: false, showSignUp: false, showSignOut: true });
  },
  signInUser: function () {
    var form = document.getElementById('signIn-form');
    var data = { email: form[0].value, password: form[1].value };
    var context = this;
    $.ajax({
      url: server_uri + '/api/users/login',
      type: 'POST',
      dataType: 'json',
      data: data,
      success: function (res) {
        context.props.app.get('user').set(res);
        context.props.app.get('user').retrievePlaylists();
        context.props.app.get('user').trigger('login');
        // socket.emit('user room join', { user: context.props.app.get('user').attributes, room: 1})
        console.log('current_room id: ', context.props.app.get('current_room').get('id'));
        // context.props.app.get('current_room').set('id', context.props.app.get('current_room').get('id'));
        // socket.emit('user room join', { user: context.props.app.get('user').attributes, room: context.props.room_id})
        // context.props.app.get('current_room').set('id', room_id);
        context.close();
        if (window.location.href.indexOf('/#/room/') === -1) {
          window.location.href = '/#/rooms';
        }
        // Check if a user logged in within an individual room and emit user room join message via socket if so
        if (window.location.href.indexOf('/#/room/') > -1) {
          if (context.props.app.get('current_room').get('id')) {
            socket.emit('user room join', { user: context.props.app.get('user').attributes, room: context.props.app.get('current_room').get('id')});
            // context.props.app.get('current_room').set('id', context.props.app.get('current_room').get('id'));
          }
        }
        context.setState({ userLoggedIn: 'Sign Out' });
      },
      error: function (res) {
        context.setState({ errorMessage: res.statusText + ": " + res.responseText });
      }
    });
  },
  signUpUser: function () {
    var form = document.getElementById('signUp-form');
    var data = { email: form[0].value, password: form[1].value, displayName: form[3].value };
    var context = this;
    if (form[1].value !== form[2].value) { context.setState({ errorMessage: 'Your passwords did not match.' }); return; }
    $.ajax({
      url: server_uri + '/api/users/signup',
      type: 'POST',
      dataType: 'json',
      data: data,
      success: function (res) {
        context.props.app.get('user').set(res);
        context.props.app.get('user').retrievePlaylists();
        context.props.app.get('user').trigger('login');
        context.close();
        if (window.location.href.indexOf('/#/room/') === -1) {
          window.location.href = '/#/rooms';
        }
      },
      error: function (res) {
        context.setState({ errorMessage: res.statusText + ': ' + res.responseText });
      }
    });
  },
  signOutUser: function () {
    var context = this;
    $.ajax({url: server_uri + '/api/users/logout',
      type: 'GET',
      success: function (res) {
        console.log('succeeded in logging out');
        context.close();
        context.setState({ userLoggedIn: false });
        context.props.app.get('user').trigger('logout');
      },
      error: function (res) {
        console.error('error in user logout');
        context.setState({ errorMessage: res.statusText + ': ' + res.responseText });
      }
    });
  },
  render: function () {
    return (
      <div>
        <TopNavBar signInClick={this.signInClick} signOutClick={this.signOutClick} errorMessage={this.state.errorMessage} userLoggedIn={this.state.userLoggedIn} app={this.props.app}/>
        <BottomNavBar />
        <SignInModal close={this.close} signUpClick={this.signUpClick} signInUser={this.signInUser} showSignIn={this.state.showSignIn} errorMessage={this.state.errorMessage} app={this.props.app}/>
        <SignUpModal close={this.close} signInClick={this.signInClick} signUpUser={this.signUpUser} showSignUp={this.state.showSignUp} errorMessage={this.state.errorMessage} app={this.props.app}/>
        <SignOutModal close={this.close} signOutUser={this.signOutUser} showSignOut={this.state.showSignOut} app={this.props.app}/>
      </div>
    );
  }
});

module.exports = NavigationController;
