var React = require('react');
var $ = require('jquery');
var ReactBootstrap = require('react-bootstrap');
var Modal = ReactBootstrap.Modal;


var SignUpModal = React.createClass({
  render: function() {
    return (
      <div>
        <Modal show={this.props.showSignUp} onHide={this.props.close}>
          <Modal.Header closeButton>
            <Modal.Title className="j-center-text">Welcome to <span className="j-color-black">pi</span><span className="j-color-blue">Tunes</span></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
            <h3>Create An Account</h3>
            <p>
              Fill in the form below to create an account.
            </p>
            <form id="signUp-form">
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
                <a type="submit" className="btn btn-default btn-md" onClick={this.props.signUpUser}><i className="fa fa-pencil fa-fw"></i><span className="network-name">Create Account</span></a>
                <br />
                <a onClick={this.props.signInOutClick}>Back To Sign In</a>
              </div>
            </form>
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

module.exports = SignUpModal;

