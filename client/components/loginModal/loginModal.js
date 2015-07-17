var Input = ReactBootstrap.Input;

var Login = React.createClass({
  getInitialState: function() {
    return {showModal:true};
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
              <Input type='text' label='Text' placeholder='Enter name' />
              <Input type='email' label='Email Address' placeholder='Enter email' />
              <Input type='password' label='Password' />
            </form>
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

var LoginModal = React.createClass({
  render: function() {
    return (
      <Login />
    );
  }
});