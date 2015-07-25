var SignIn = React.createClass({
  signInUser: function() {
    var form = document.getElementById('login-form');
    var data = {email: form[0].value, password: form[1].value};
    var that = this;
    $.ajax({
            url: server_uri + '/api/users/login', 
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function(res) {
              user = res;
              that.setState({showModal: false});
              this.props.close();
            },
            error: function(res) {
              that.setState({errorMessage: res.statusText + ': ' + res.responseText});
            }
          });

  },
  render: function() {
    return (
      <div>
      <form id="login-form">
        <div className="form-group">
          <label htmlFor="login-email" className="hide">Email</label>
          <input type="email" className="form-control input-lg" id="login-email" placeholder="Email" required />
        </div>
        <div className="form-group">
          <label htmlFor="login-password" className="hide">Password</label>
          <input type="password" className="form-control input-lg " id="login-password" placeholder="Password" required />
        </div>
        <div className="form-group j-center-text">
          <a type="submit" className="btn btn-default btn-md" onClick={this.signInUser}><i className="fa fa-sign-in fa-fw"></i><span className="network-name">Sign In</span></a>
          <br />
          <a href="javascript:;" data-dismiss="modal">Forgot Your Password?</a>
        </div>
      </form>
      <div className="modal-footer j-center-text">
        <span>Dont Have An Account Yet ?</span>
        <a className="j-padding-left-10 j-pointer" onClick={this.props.signupClick}>Sign Up</a>
      </div>
      </div>
    );
  }
});
