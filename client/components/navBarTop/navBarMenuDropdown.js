var NavItem = ReactBootstrap.NavItem;
var MenuItem = ReactBootstrap.MenuItem;
var DropdownButton = ReactBootstrap.DropdownButton;
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var Button = ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;

var DropdownStyle = {
  backgroundColor: '#888888',
  borderColor: '#444444',
  margin: '8px 0px 0px 0px',
};

var SignOut = React.createClass({
  getInitialState: function() {
    return {showModal:false};
  },
  close: function() {
    this.setState({showModal: false});
  },
  open: function() {
    this.setState({showModal: true});
  },
  render: function() {
    var buttonStyle = {
      backgroundColor: 'grey',
      marginTop: '4%'
    };
    console.log('heasdf')
    return (
      <div>
        <ButtonToolbar>
          <Button style={buttonStyle}>Profile</Button>
          <Button onClick={this.open} style={buttonStyle}>Sign Out</Button>
        </ButtonToolbar>

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