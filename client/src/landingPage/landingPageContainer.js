var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var server_uri = 'http://' + document.domain + ':3000',
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
                        <a className="navbar-brand topnav" href="#"><span className="j-color-black">pi</span><span className="j-color-blue">Tunes</span></a>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <a href="#/">Home</a>
                            </li>
                            <li>
                                <a href="#/rooms">Rooms</a>
                            </li>
                            <li>
                                <a className="j-pointer" onClick={this.loginClick}>Sign In</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <a name="home"></a>
            <div className="intro-header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="intro-message">
                                <h1>piTunes</h1>
                                <h3 className="j-font-uppercase">Listen to music with the people you love</h3>
                                <hr className="intro-divider"></hr>
                                <ul className="list-inline intro-social-buttons">
                                    <li>
                                        <a onClick={this.loginClick} className="btn btn-default btn-lg"><i className="fa fa-sign-in fa-fw"></i><span className="network-name">Sign In</span></a>
                                    </li>
                                    <li>
                                        <a href="#/" className="btn btn-default btn-lg"><i className="fa fa-music fa-fw"></i><span className="network-name">Join Room</span></a>
                                    </li>
                                    <li>
                                        <a onClick={this.signupClick} className="btn btn-default btn-lg"><i className="fa fa-pencil fa-fw"></i><span className="network-name">Sign Up</span></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <a name="services"></a>
            <div className="content-section-a">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-sm-4">
                            <div className="clearfix"></div>
                            <h2 className="section-heading j-center-text">Random Room 1 <br />DJs:</h2>
                            <div className="j-left-25">
                                <img className="img-responsive" src="assets/img/headphones.jpg" alt="" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-4">
                            <div className="clearfix"></div>
                            <h2 className="section-heading j-center-text">Random Room 2<br />DJs:</h2>
                            <div className="j-left-25">
                                <img className="img-responsive" src="assets/img/ipad.png" alt="" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-4">
                            <div className="clearfix"></div>
                            <h2 className="section-heading j-center-text">Random Room 3<br />DJs:</h2>
                            <div className="j-left-25">
                                <img className="img-responsive" src="assets/img/headphones.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 j-center-text">
                            <ul className="list-inline">
                                <li>
                                    <a href="#home">Home</a>
                                </li>
                                <li className="footer-menu-divider">&sdot;</li>
                                <li>
                                    <a href="#home">About</a>
                                </li>
                            </ul>
                            <p className="copyright text-muted small">Copyright &copy; 2015, Scintillating Açaí, All Rights Reserved</p>
                        </div>
                    </div>
                </div>
            </footer>

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

module.exports = LandingPageContainer;
