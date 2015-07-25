var LoginController = React.createClass({
  getInitialState: function() {
    return { showSignIn: false, showSignUp: false, showSignOut: false, errorMessage: '' };
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
      success: function(res) {
        console.log('user has been logged in');
        user = res;
        self.close();
      },
      error: function(res) {
        console.log(res.statusText)
        self.setState({ errorMessage: res.statusText });
      }
    });
  },
  signUpUser: function() {
    var form = document.getElementById('signUp-form');
    var data = { email: form[0].value, password: form[1].value, password: form[2].value, displayName: form[3].value }
    var self = this;
    if (form[1].value !== form[2].value) { self.setState({ errorMessage: 'Your passwords did not match.'} ); return; }
    $.ajax({
      url: server_uri + '/api/users/signup',
      type: 'POST',
      dataType: 'json',
      data: data,
      success: function(res) {
        console.log('user has been signed up');
        user = res;
        self.close();
      },
      error: function(res) {
        self.setState({ errorMessage: res.statusText });
      }
    });
  },
  render: function() {
    return (
      <div>
      <TestTopNavBar signInClick={this.signInClick} />
      <TestBottomNavBar />
      <TestSignOutModal close={this.close} signOutClick={this.signOutClick} showSignOut={this.state.showSignOut} />
      <TestSignUpModal close={this.close} signInClick={this.signInClick} signUpUser={this.signUpUser} showSignUp={this.state.showSignUp} errorMessage={this.state.errorMessage} />
      <TestSignInModal close={this.close} signUpClick={this.signUpClick} signInUser={this.signInUser} showSignIn={this.state.showSignIn} errorMessage={this.state.errorMessage} />
      </div>
    );
  }
});

React.render(
  <div>
    <LoginController />
  </div>,
  document.getElementsByClassName('testIndexPageContainer')[0]
);