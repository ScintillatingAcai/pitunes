var React = require('react');
var $ = require('jquery');
var ReactBootstrap = require('react-bootstrap');

// Rename Playlist Modal
var Modal = ReactBootstrap.Modal;

var RenamePlaylistModal = React.createClass({
  keyPress: function(e) {
    if(e.charCode === 13) {
      this.props.submitUpdatePlaylist();
    }
  },
  render: function () {
    return (
      <div>
        <Modal show={this.props.showRenamePlaylist} onHide={this.props.close}>
          <Modal.Header closeButton>
            <Modal.Title className="j-center-text">Rename Playlist</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
            <form id="renamePlaylist-form" onSubmit={this.props.preventSubmit}>
              <div className="form-group">
                <label htmlFor="renamePlaylist-form" className="hide">Password</label>
                <input type="text" className="form-control input-lg " id="renamePlaylist-name" onKeyPress={this.keyPress} placeholder="Rename Current Playlist" required />
              </div>
              <div className="form-group j-center-text">
                <a type="submit" className="btn btn-default btn-md" onClick={this.props.submitUpdatePlaylist}><i className="fa fa-pencil fa-fw"></i><span className="network-name">Rename Playlist</span></a>
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

module.exports = RenamePlaylistModal;
