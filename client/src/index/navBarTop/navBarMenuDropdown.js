var NavItem = ReactBootstrap.NavItem;
var MenuItem = ReactBootstrap.MenuItem;
var DropdownButton = ReactBootstrap.DropdownButton;
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var Button = ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;

var SignOut = React.createClass({
  getInitialState: function() {
    return {showModal:false};
  },
  close: function() {
    this.setState({showModal: false});

    var that = this;
    $.ajax({url: server_uri + '/api/users/logout',
      type: 'GET',
      success: function (res) {
        user = {id: 0, display_name: 'Anonymous' + Math.floor(Math.random() * 1000)};
      },
      error: function (res) {
        console.error('error in user logout')
      }
    });
  },
  open: function() {
    this.setState({showModal: true});
  },
  render: function() {
    var buttonStyle = {
      backgroundColor: 'grey',
      marginTop: '8px',
      marginLeft: '5px'
    };
    return (
      <div>
        <Button style={buttonStyle}>Profile</Button>
        <Button onClick={this.open} style={buttonStyle}>Sign Out</Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Signing Out</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Are you sure you want to sign out?</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Cancel</Button>
            <Button onClick={this.close}>Continue</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

var NavBarMenuDropdown = React.createClass({
  render: function() {
    return (
      <SignOut />
    );
  }
});