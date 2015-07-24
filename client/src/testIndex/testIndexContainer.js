var user = null, 
    room = 'root', 
    server_uri = 'http://' + document.domain + ':3000',
    socket = io(server_uri);

var Modal = ReactBootstrap.Modal;
var Input = ReactBootstrap.Input;
var Button = ReactBootstrap.Button;

var LandingPageContainer = React.createClass({
    getInitialState: function() {
      return {showModal: false, errorMessage: '', showSignIn: false, showSignUp: false};
    },
    close: function() {
      this.setState({showModal: false, errorMessage: ''});
    },
    open: function() {
      this.setState({showModal: true});
    },
    signupClick: function() {
      this.setState({showModal: true});
      this.setState({showSignIn: false});
      this.setState({showSignUp: true});
    },
    loginClick: function() {
      this.setState({showModal: true});
      this.setState({showSignIn: true});
      this.setState({showSignUp: false});
    },
    render: function() {
        var form = (this.state.showSignIn ? <SignIn signupClick={this.signupClick} close={this.close}/> : <SignUp loginClick={this.loginClick} close={this.close}/>);
        return (
            <div>
            <nav className="navbar navbar-default navbar-fixed-top topnav" role="navigation">
                <div className="container topnav">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand topnav" href="landingPage.html">pi<span className="j-color-blue">Tunes</span></a>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <a href="landingPage.html">Home</a>
                            </li>
                            <li>
                                <a href="rooms.html">Rooms</a>
                            </li>
                            <li>
                                <a className="j-pointer" onClick={this.loginClick}>Sign In</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <a name="home"></a>
            <div className="body-container">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="intro-message">
                              <div className="top">
                                top
                              </div>
                              <div className="bot">
                                bot
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='j-footer-bot'>
                <div className="row">
                    <div className="col-lg-12">
                        <p className="copyright text-muted small">Copyright &copy; 2015, Scintillating Açaí, All Rights Reserved</p>
                    </div>
                </div>
            </div>

            <div>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title className="j-center-text">Welcome to <span className="j-color-black">pi</span><span className="j-color-blue">Tunes</span></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {form}
                    </Modal.Body>
                    <Modal.Footer>
                        <span className="j-color-red">{this.state.errorMessage}</span>
                    </Modal.Footer>
                </Modal>
            </div>

            </div>
        );
    }
});

// SignUp Form
var SignUp = React.createClass({
  signupUser: function() {
    var form = document.getElementById('signup-form');
    var data = {email: form[0].value, password: form[1].value, password: form[2].value, displayName: form[3].value}
    var that = this;
    if (form[2].value !== form[3].value) { that.setState({errorMessage: 'Your passwords did not match.'}); return; }
    $.ajax({url: server_uri + '/api/users/signup',
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function(res) {
              user = res;
              that.setState({showModal: false});
              this.props.close();
            },
            error: function(res) {
              that.setState({errorMessage: res.statusText});
            }
          });
  },
  render: function() {
    return (
      <div>
      <h3>Create An Account</h3>
      <p>
        Fill in the form below to create an account.
      </p>
      <form id="signupForm">
        <div className="form-group">
          <label htmlFor="signup-email" className="hide">Email</label>
          <input type="email" className="form-control input-lg" id="signup-email" placeholder="Email" required></input>
        </div>
        <div className="form-group">
          <label htmlFor="login-password" className="hide">Password</label>
          <input type="password" className="form-control input-lg" id="login-password" placeholder="Password" required></input>
        </div>
        <div className="form-group">
          <label htmlFor="login-password2" className="hide">Password</label>
          <input type="password" className="form-control input-lg" id="login-password2" placeholder="Re-enter Password" required></input>
        </div>
        <div className="form-group">
          <label htmlFor="signup-displayName" className="hide">Fullname</label>
          <input type="text" className="form-control input-lg" id="signup-displayName" placeholder="Display Name" required></input>
        </div>
        <div className="form-group j-center-text">
          <a type="submit" className="btn btn-default btn-md" onClick={this.signupUser}><i className="fa fa-pencil fa-fw"></i><span className="network-name">Create Account</span></a>
          <br />
          <a onClick={this.props.loginClick}>Back To Login</a>
        </div>
      </form>
      </div>
    );
  }
});

// SignIn Form
var SignIn = React.createClass({
  signInUser: function() {
    var form = document.getElementById('login-form');
    var data = {email: form[0].value, password: form[1].value};
    var that = this;
    $.ajax({
            url: server_uri + '/api/users/login', 
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function(res) {
              user = res;
              that.setState({showModal: false});
              this.props.close();
            },
            error: function(res) {
              that.setState({errorMessage: res.statusText});
            }
          });
  },
  render: function() {
    return (
      <div>
      <form id="login-form">
        <div className="form-group">
          <label htmlFor="login-email" className="hide">Email</label>
          <input type="email" className="form-control input-lg" id="login-email" placeholder="Email" required />
        </div>
        <div className="form-group">
          <label htmlFor="login-password" className="hide">Password</label>
          <input type="password" className="form-control input-lg " id="login-password" placeholder="Password" required />
        </div>
        <div className="form-group j-center-text">
          <a type="submit" className="btn btn-default btn-md" onClick={this.signInUser}><i className="fa fa-sign-in fa-fw"></i><span className="network-name">Sign In</span></a>
          <br />
          <a href="javascript:;" data-dismiss="modal">Forgot Your Password?</a>
        </div>
      </form>
      <div className="modal-footer j-center-text">
        <span>Dont Have An Account Yet ?</span>
        <a className="j-padding-left-10 j-pointer" onClick={this.props.signupClick}>Sign Up</a>
      </div>
      </div>
    );
  }
});

React.render(
    <div>
        <LandingPageContainer />
    </div>,
  document.getElementsByClassName('landingPageContainer')[0]
);