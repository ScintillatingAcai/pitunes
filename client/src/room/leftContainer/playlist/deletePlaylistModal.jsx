
var React = require('react');
var $ = require('jquery');
var ReactBootstrap = require('react-bootstrap');

// Delete Playlist Modal
var Modal = ReactBootstrap.Modal;

var DeletePlaylistModal = React.createClass({
  render: function () {
    return (
      <div>
        <Modal show={this.props.showDeletePlaylist} onHide={this.props.close}>
          <Modal.Header closeButton>
            <Modal.Title className="j-center-text">Are you sure you want to delete your current playlist?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
            <form id="renamePlaylist-form">
              <div className="form-group j-center-text">
                <a type="submit" className="btn btn-default btn-md" onClick={this.props.deleteCurrentPlaylist}><span className="network-name confirm">Confirm</span></a>
                <a type="submit" className="btn btn-default btn-md" onClick={this.props.close}><span className="network-name cancel">Cancel</span></a>
              </div>
            </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
});

module.exports = DeletePlaylistModal;