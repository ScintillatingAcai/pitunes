var React = require('react');
var $ = require('jquery');
var ReactBootstrap = require('react-bootstrap');
var Modal = ReactBootstrap.Modal;

var UserAttemptModal = React.createClass({
  render: function () {
    return (
      <div>
        <Modal show={this.props.showUserAttempt} onHide={this.props.close}>
          <Modal.Header closeButton>
            <Modal.Title className="j-center-text"><span className="j-color-black">pi</span><span className="j-color-blue">Tunes</span></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <p>
                You need to sign in to create a playlist.
              </p>
              <form id="signupForm">
                <div className="form-group j-center-text">
                  <a type="submit" className="btn btn-default btn-md" onClick={this.props.close} ><span className="network-name">OK</span></a>
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
});

module.exports = UserAttemptModal;
