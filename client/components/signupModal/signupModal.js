var signupModal = React.createClass({
  render: function() {
    return (
      <div className="modal fade c-content-login-form" id="signup-form" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content c-square">
            <div className="modal-header c-no-border">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
            <div className="modal-body">
              <h3 className="c-font-24 c-font-sbold">Create An Account</h3>
              <p>
                Fill in the form below to create an account.
              </p>
              <form id="signupForm">
                <div className="form-group">
                  <label htmlFor="signup-email" className="hide">Email</label>
                  <input type="email" className="form-control input-lg c-square" id="signup-email" placeholder="Email" required></input>
                </div>
                <div className="form-group">
                  <label htmlFor="login-password" className="hide">Password</label>
                  <input type="password" className="form-control input-lg c-square" id="login-password" placeholder="Password" required></input>
                </div>
                <div className="form-group">
                  <label htmlFor="signup-displayName" className="hide">Fullname</label>
                  <input type="text" className="form-control input-lg c-square" id="signup-displayName" placeholder="Display Name" required></input>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn c-theme-btn btn-md c-btn-uppercase c-btn-bold c-btn-square c-btn-login" onClick={this.signupUser}>Sign Up</button>
                  <a href="javascript:;" className="c-btn-forgot" data-toggle="modal" data-target="#login-form" data-dismiss="modal">Back To Login</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
});