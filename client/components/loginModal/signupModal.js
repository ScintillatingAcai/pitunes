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
  signupUser: function() {
    var form = document.getElementById('signupForm');
    var data = {displayName: form[0].value, email: form[1].value, password: form[2].value};
    var that = this;
    $.ajax({url: server_uri + '/api/users/signup', 
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function(res) {
              user = res.data;
              that.setState({showModal: false});
            } ,
            error: function(res) {
              that.setState({errorMessage: res.statusText});
            }
    });
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
            <form id='signupForm'>
              <Input type='text' label='Display Name' placeholder='Enter name' />
              <Input type='email' label='Email Address' placeholder='Enter email' />
              <Input type='password' label='Password' />
              <Input type='password' label='Re-enter Password' />
            </form>
            <Button onClick={this.signupUser}>Sign Up</Button>
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
