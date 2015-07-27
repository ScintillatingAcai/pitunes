var user = null, 
  room = 'root', 
  server_uri = 'http://' + document.domain + ':3000',
  socket = io(server_uri);

var TestSignOutModal = React.createClass({
  getInitialState: function() {
    return { errorMessage: '' };
  },
  signOut: function() {
    $.ajax({url: server_uri + '/api/users/logout',
      type: 'GET',
      success: function (res) {
        // user = {id: 0, display_name: 'Anonymous' + Math.floor(Math.random() * 1000)};
        console.log('succeeded in logging out');
      },
      error: function (res) {
        console.error('error in user logout');
      }
    });
  },
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
                <a type="submit" className="btn btn-default btn-md" onClick={this.signOut}><i className="fa fa-pencil fa-fw"></i><span className="network-name">Continue</span></a>
                <a type="submit" className="btn btn-default btn-md" onClick={this.props.close}><i className="fa fa-pencil fa-fw"></i><span className="network-name">Cancel</span></a> 
              </div>
            </form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <span className="j-color-red">{this.state.errorMessage}</span>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});



