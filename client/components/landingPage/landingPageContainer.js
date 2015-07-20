var Modal = ReactBootstrap.Modal;
var Input = ReactBootstrap.Input;
var Button = ReactBootstrap.Button;

var LandingPageContainer = React.createClass({
    getInitialState: function() {
      return {showModal: false, errorMessage: '', showLogin: false, showSignUp: false};
    },
    close: function() {
      this.setState({showModal: false});
    },
    open: function() {
      this.setState({showModal: true});
    },
    signInUser: function() {
      var form = document.getElementById('loginForm');
      var data = {email: form[0].value, password: form[1].value};
      var that = this;
      $.ajax({url: server_uri + '/api/users/login', 
              type: 'POST',
              dataType: 'json',
              data: data,
              success: function(res) {
                user = res;
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
                user = res;
                that.setState({showModal: false});
              } ,
              error: function(res) {
                that.setState({errorMessage: res.statusText});
              }
            });
    },
    signUpClick: function() {
      this.setState({showModal: true});
      this.setState({showLogin: false});
      this.setState({showSignUp: true});
    },
    loginClick: function() {
      this.setState({showModal: true});
      this.setState({showLogin: true});
      this.setState({showSignUp: false});
    },
    showLoginForm: function(){
      return (
        <div>
        <form id="login-form">
          <div className="form-group">
            <label htmlFor="login-email" className="hide">Email</label>
            <input type="email" className="form-control input-lg" id="login-email" placeholder="Email" require></input>
          </div>
          <div className="form-group">
            <label htmlFor="login-password" className="hide">Password</label>
            <input type="password" className="form-control input-lg " id="login-password" placeholder="Password" require></input>
          </div>
          <div className="form-group j-center-text">
            <a className="btn btn-default btn-md" onClick={this.signInUser} data-target="#login-form"><i className="fa fa-sign-in fa-fw"></i><span className="network-name">Sign In</span></a>
            <br />
            <a href="javascript:;" data-toggle="modal" data-target="#forget-password-form" data-dismiss="modal">Forgot Your Password?</a>
          </div>
        </form>
        <div className="modal-footer j-center-text">
          <span>Dont Have An Account Yet ?</span>
          <a className="j-padding-left-10 j-pointer" onClick={this.signUpClick}>Sign Up</a>
        </div>
        </div>
      );
    },
    showSignUpForm: function() {
      return (
        <div>
          <form id='signupForm'>
            <Input type='text' label='Display Name' placeholder='Enter name' required />
            <Input type='email' label='Email Address' placeholder='Enter email' required />
            <Input type='password' label='Password' placeholder='Enter password' required />
            <Input type='password' label='Re-enter Password' placeholder='Re-enter password' required />
          </form>
          <ul className="list-inline j-center-text">
            <li>
              <a onClick={this.signUpClick} className="btn btn-default btn-md"><i className="fa fa-music fa-fw"></i> <span className="network-name">Sign Up</span></a>
            </li>
            <li>
              <a onClick={this.loginClick} className="btn btn-default btn-md"><i className="fa fa-sign-in fa-fw"></i><span className="network-name">Sign In</span></a>
            </li>
            <li>
              <a onClick={this.close} className="btn btn-default btn-md"><i className="fa fa-sign-in fa-fw"></i><span className="network-name">Cancel</span></a>
            </li>
          </ul>
        </div>
      );
    },
    render: function() {
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
                        <a className="navbar-brand topnav" href="#"><span className="j-color-blue">pi</span>Tunes</a>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <a href="#home">Home</a>
                            </li>
                            <li>
                                <a href="#services">Rooms</a>
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
                                        <a onClick={this.signUpClick} className="btn btn-default btn-lg"><i className="fa fa-music fa-fw"></i> <span className="network-name">Sign Up</span></a>
                                    </li>
                                    <li>
                                        <a href="#home" className="btn btn-default btn-lg"><i className="fa fa-users fa-fw"></i> <span className="network-name">Join Room</span></a>
                                    </li>
                                    <li>
                                        <a onClick={this.loginClick} className="btn btn-default btn-lg"><i className="fa fa-sign-in fa-fw"></i><span className="network-name">Sign In</span></a>
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
                            <h2 className="section-heading j-center-text">Random Room 1<br />DJ's:</h2>
                            <div className="j-left-25">
                                <img className="img-responsive" src="assets/img/headphones.jpg" alt="" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-4">
                            <div className="clearfix"></div>
                            <h2 className="section-heading j-center-text">Random Room 2<br />DJ's:</h2>
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
                                    <a href="#about">About</a>
                                </li>
                                <li className="footer-menu-divider">&sdot;</li>
                                <li>
                                    <a href="#services">Services</a>
                                </li>
                                <li className="footer-menu-divider">&sdot;</li>
                                <li>
                                    <a href="#contact">Contact</a>
                                </li>
                            </ul>
                            <p className="copyright text-muted small">Copyright &copy; Scintillating Açaí 2015. All Rights Reserved</p>
                        </div>
                    </div>
                </div>
            </footer>

            <div>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Welcome to <span className="j-color-blue">pi</span>Tunes</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.showLogin ? this.showLoginForm() : null}
                        {this.state.showSignUp ? this.showSignUpForm() : null}
                    </Modal.Body>
                    <Modal.Footer>
                        <span>{this.state.errorMessage}</span>
                    </Modal.Footer>
                </Modal>
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