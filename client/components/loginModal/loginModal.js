var Input = ReactBootstrap.Input;

var Login = React.createClass({
  getInitialState: function() {
    return {showModal: true, errorMessage: 'testing', showLogin: true, showSignUp: false};
  },
  close: function() {
    this.setState({showModal: false});
  },
  open: function() {
    this.setState({showModal: true});
  },
  loginUser: function() {
    var form = document.getElementById('loginForm');
    var data = {email: form[0].value, password: form[1].value};
    var that = this;
    $.ajax({url: server_uri + '/api/users/login', 
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function(res) {
              user = res.data;
              that.setState({showModal: false});
            } ,
            error: function(res) {
              that.setState({errorMessage: res.statusText});
            }
    });
  },
  signupUser: function() {
    var form = document.getElementById('signupForm');
    var data = {displayName: form[0].value, email: form[1].value, password: form[2].value};
    var that = this;
    $.ajax({url: server_uri + '/api/users/signup', 
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function(res) {
              user = res.data;
              that.setState({showModal: false});
            } ,
            error: function(res) {
              that.setState({errorMessage: res.statusText});
            }
          });
  },
  signUpClick: function() {
    this.setState({showLogin: false});
    this.setState({showSignUp: true});
  },
  showLoginForm: function(){
    return (
      <div>
        <form id='loginForm'>
          <Input type='email' label='Email Address' placeholder='Enter email' />
          <Input type='password' label='Password' />
        </form>
        <Button onClick={this.loginUser}>Log In</Button>
        <Button onClick={this.close}>Cancel</Button>
        <Button onClick={this.signUpClick}>Sign Up</Button>
      </div>
    );
  },
  showSignUpForm: function() {
    return (
      <div>
        <form id='signupForm'>
          <Input type='text' label='Display Name' placeholder='Enter name' />
          <Input type='email' label='Email Address' placeholder='Enter email' />
          <Input type='password' label='Password' />
          <Input type='password' label='Re-enter Password' />
        </form>
        <Button onClick={this.close}>Sign Up</Button>
        <Button onClick={this.close}>Cancel</Button>
      </div>
    );
  },
  render: function() {
    var buttonStyle = {
      backgroundColor: 'grey',
      marginTop: '8px'
    };
    return (
      <div>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Welcome to piTunes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            { this.state.showLogin ? this.showLoginForm() : null }
            { this.state.showSignUp ? this.showSignUpForm() : null }
          </Modal.Body>
          <Modal.Footer>
            <span>{this.state.errorMessage}</span>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

var LoginModal = React.createClass({
  render: function() {
    return (
      <Login />
    );
  }
});
