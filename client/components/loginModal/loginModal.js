var Input = ReactBootstrap.Input;

var Login = React.createClass({
  getInitialState: function() {
    return {showModal:true, errorMessage: 'testing'};
  },
  close: function() {
    this.setState({showModal: false});
  },
  open: function() {
    this.setState({showModal: true});
  },
  loginUser: function() {
    var form = document.getElementById('loginForm');
    var data = {email: form[0].value, password: form[1].value};
    var that = this;
    $.ajax({url: server_uri + '/api/users/login', 
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
            <form id='loginForm'>
              <Input type='email' label='Email Address' placeholder='Enter email' />
              <Input type='password' label='Password' />
            </form>
            <Button onClick={this.loginUser}>Log In</Button>
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

var LoginModal = React.createClass({
  render: function() {
    return (
      <Login />
    );
  }
});
