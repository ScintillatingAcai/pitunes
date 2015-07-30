var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Modal = ReactBootstrap.Modal;


var SignOutModal = React.createClass({
  render: function() {
    return (
      <div>
        <Modal show={this.props.showSignOut} onHide={this.props.close}>
          <Modal.Header closeButton>
            <Modal.Title className="j-center-text">Welcome to <span className="j-color-black">pi</span><span className="j-color-blue">Tunes</span></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
            <h3>Signing Out</h3>
            <p>
              Are you sure you want to sign out?
            </p>
            <form id="signupForm">
              <div className="form-group j-center-text">
                <a type="submit" className="btn btn-default btn-md" onClick={this.props.signOutUser}><span className="network-name">Sign Out</span></a>
                <a type="submit" className="btn btn-default btn-md" onClick={this.props.close}><span className="network-name">Cancel</span></a> 
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

module.exports = SignOutModal;


