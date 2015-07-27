var LandingPageBackground = React.createClass({
  render: function() {
    return (
      <div>
        <a name="home"></a>
        <div className="intro-header">
          <div className="container">
            <div className="row">
                <div className="col-lg-12">
                  <div className="intro-message j-padding-top-15-percent">
                    <h1>piTunes</h1>
                    <h3 className="j-font-uppercase">Listen to music with the people you love</h3>
                    <hr className="intro-divider"></hr>
                    <ul className="list-inline intro-social-buttons">
                      <li>
                        <a onClick={this.props.signInClick} className="btn btn-default btn-lg"><i className="fa fa-sign-in fa-fw"></i><span className="network-name">Sign In</span></a>
                      </li>
                      <li>
                        <a href="rooms.html" className="btn btn-default btn-lg"><i className="fa fa-music fa-fw"></i><span className="network-name">Join Room</span></a>
                      </li>
                      <li>
                        <a onClick={this.props.signUpClick} className="btn btn-default btn-lg"><i className="fa fa-pencil fa-fw"></i><span className="network-name">Sign Up</span></a>
                      </li>
                    </ul>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});