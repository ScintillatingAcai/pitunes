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
    return { showSignIn: false, showSignUp: false, showSignOut: false, errorMessage: '' };
  },
  componentWillMount: function () {
    var context = this;
    $('body').on('click', '#landing-signin', function () {
      context.signInClick();
    });
    $('body').on('click', '#landing-signup', function () {
      context.signUpClick();
    });
    this.props.app.on('userSignInOut', this.updateForSignInStatus);
    this.updateForSignInStatus();
  },
  componentWillUnmount: function () {
    $('body').off('click');
    this.props.app.off('userSignInOut');
  },
  close: function () {
    this.setState({ showSignIn: false, showSignUp: false, showSignOut: false, errorMessage: '' });
  },
  signUpClick: function () {
    this.setState({ showSignIn: false, showSignUp: true, showSignOut: false });
  },
  signInClick: function () {
    if (this.props.app.isSignedIn()) {
      this.setState({ showSignIn: false, showSignUp: false, showSignOut: true });
    } else {
      this.setState({ showSignIn: true, showSignUp: false, showSignOut: false });
    }

  },
  signOutClick: function () {
    this.setState({ showSignIn: false, showSignUp: false, showSignOut: true });
  },
  updateForSignInStatus: function () {
    if (this.props.app.isSignedIn()) {
      console.log('heard user was logged in');
    } else {
      console.log('heard user was logged out');
    }
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
        context.props.app.userSignIn(res);
        context.close();
        if (window.location.href.indexOf('/#/room/') === -1) {
          window.location.href = '/#/rooms';
        }
        if (window.location.href.indexOf('/#/rooms')) {
          location.reload();
        }
        // Check if a user logged in within an individual room and emit user room join message via socket if so
        if (window.location.href.indexOf('/#/room/') > -1) {
          if (context.props.app.get('current_room').get('id')) {
            socket.emit('user room join', { user: context.props.app.get('user').attributes, room: context.props.app.get('current_room').get('id')});
          }
        }
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
        context.props.app.userSignIn(res);
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
        context.props.app.userSignOut();
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
        <TopNavBar signInClick={this.signInClick} signOutClick={this.signOutClick} errorMessage={this.state.errorMessage} app={this.props.app}/>
        <BottomNavBar />
        <SignInModal close={this.close} signUpClick={this.signUpClick} signInUser={this.signInUser} showSignIn={this.state.showSignIn} errorMessage={this.state.errorMessage} app={this.props.app}/>
        <SignUpModal close={this.close} signInClick={this.signInClick} signUpUser={this.signUpUser} showSignUp={this.state.showSignUp} errorMessage={this.state.errorMessage} app={this.props.app}/>
        <SignOutModal close={this.close} signOutUser={this.signOutUser} showSignOut={this.state.showSignOut} app={this.props.app}/>
      </div>
    );
  }
});

module.exports = NavigationController;
