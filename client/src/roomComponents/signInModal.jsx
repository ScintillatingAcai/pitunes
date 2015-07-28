var React = require('react');
var $ = require('jquery');
var ReactBootstrap = require('react-bootstrap');
var Modal = ReactBootstrap.Modal;

var user = null, 
  room = 'root', 
  server_uri = 'http://' + document.domain + ':3000',
  socket = io(server_uri);

var SignInModal = React.createClass({
  render: function() {
    return (
      <div>
        <Modal show={this.props.showSignIn} onHide={this.props.close}>
          <Modal.Header closeButton>
            <Modal.Title className="j-center-text">Welcome to <span className="j-color-black">pi</span><span className="j-color-blue">Tunes</span></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
            <form id="signIn-form">
              <div className="form-group">
                <label htmlFor="login-email" className="hide">Email</label>
                <input type="email" className="form-control input-lg" id="login-email" placeholder="Email" required />
              </div>
              <div className="form-group">
                <label htmlFor="login-password" className="hide">Password</label>
                <input type="password" className="form-control input-lg " id="login-password" placeholder="Password" required />
              </div>
              <div className="form-group j-center-text">
                <a type="submit" className="btn btn-default btn-md" onClick={this.props.signInUser}><i className="fa fa-sign-in fa-fw"></i><span className="network-name">Sign In</span></a>
                <br />
                <a href="javascript:;" data-dismiss="modal">Forgot Your Password?</a>
              </div>
            </form>
            <div className="modal-footer j-center-text">
              <span>Dont Have An Account Yet ?</span>
              <a className="j-padding-left-10 j-pointer" onClick={this.props.signUpClick}>Sign Up</a>
            </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <span className="j-color-red">{this.props.errorMessage}</span>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

module.exports = SignInModal;