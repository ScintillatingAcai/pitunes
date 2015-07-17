var Input = ReactBootstrap.Input;

var SignUp = React.createClass({
  getInitialState: function() {
    return {showModal: false, errorMessage: ''};
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
      marginTop: '8px'
    };
    return (
      <div>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Welcome to piTunes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <Input type='text' label='Display Name' placeholder='Enter name' />
              <Input type='email' label='Email Address' placeholder='Enter email' />
              <Input type='password' label='Password' />
              <Input type='password' label='Re-enter Password' />
            </form>
            <Button onClick={this.close}>Sign Up</Button>
            <Button onClick={this.close}>Cancel</Button>
          </Modal.Body>
          <Modal.Footer>
            <span>{this.state.errorMessage}</span>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

var SignUpModal = React.createClass({
  render: function() {
    return (
      <SignUp />
    );
  }
});
