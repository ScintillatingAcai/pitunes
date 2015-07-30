var React = require('react');
var $ = require('jquery');
var ReactBootstrap = require('react-bootstrap');
var Modal = ReactBootstrap.Modal;

var CreateRoomModal = React.createClass({
  render: function() {
    return (
      <div>
        <Modal show={this.props.showCreateRoomModal} onHide={this.props.close}>
          <Modal.Header closeButton>
            <Modal.Title className="j-center-text">Welcome to <span className="j-color-black">pi</span><span className="j-color-blue">Tunes</span></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
            <h3>Create a room</h3>
            <p>
              Fill in the form below to create a room.
            </p>
            <form id="createRoom-form">
              <div className="form-group">
                <label htmlFor="createRoom-name" className="hide">Fullname</label>
                <input type="text" className="form-control input-lg" id="createRoom-name" placeholder="Room Name" required></input>
              </div>
              
              <div className="form-group j-center-text">
                <a type="submit" className="btn btn-default btn-md" onClick={this.props.createRoomClick}><i className="fa fa-pencil fa-fw"></i><span className="network-name">Create Room</span></a>
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

module.exports = CreateRoomModal;