var React = require('react');
var $ = require('jquery');
var ReactBootstrap = require('react-bootstrap');

// New Playlist Modal
var Modal = ReactBootstrap.Modal;

var NewPlaylistModal = React.createClass({
  keyPress: function(e) {
    if(e.charCode === 13) {
      this.props.createNewPlaylist();
    }
  },
  render: function () {
    return (
      <div>
        <Modal show={this.props.showNewPlaylist} onHide={this.props.close}>
          <Modal.Header closeButton>
            <Modal.Title className="j-center-text">Create New Playlist</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
            <form id="newPlaylist-form" onSubmit={this.props.preventSubmit} >
              <div className="form-group">
                <label htmlFor="newPlaylist-form" className="hide">Password</label>
                <input type="text" className="form-control input-lg " id="newPlaylist-name" onKeyPress={this.keyPress} placeholder="Enter a Playlist Name" required />
              </div>
              <div className="form-group j-center-text">
                <a type="submit" className="btn btn-default btn-md" onClick={this.props.createNewPlaylist}><i className="fa fa-music fa-fw"></i><span className="network-name">Create New Playlist</span></a>
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

module.exports = NewPlaylistModal;
