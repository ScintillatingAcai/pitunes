var React = require('react');

var LandingPageBody = React.createClass({
  componentDidMount: function() {
    this.props.app.on('userSignInOut', this.updateForSignInStatus);
    this.updateForSignInStatus();
  },
  componentWillUnmount: function () {
    this.props.app.off('userSignInOut');
  },
  updateForSignInStatus: function () {
    this.forceUpdate();
  },
  render: function() {
    var signIn = null;
    var signUp = null;

    if (!this.props.app.isSignedIn() === true) {
      signIn =  (<li>
                  <a className="btn btn-default btn-lg" id="landing-signin"><i className="fa fa-sign-in fa-fw"></i><span className="network-name">Sign In</span></a>
                </li>)
      signUp =  (<li>
                 <a className="btn btn-default btn-lg" id="landing-signup"><i className="fa fa-pencil fa-fw"></i><span className="network-name">Sign Up</span></a>
                 </li>)
    }
    return (
      <div>
        <a name="home"></a>
        <div className="intro-header">
          <div className="container">
            <div className="row">
                <div className="col-lg-12">
                  <div className="intro-message j-padding-top-30-percent">
                    <h1>piTunes</h1>
                    <h3 className="j-font-uppercase">Listen to music with the people you love</h3>
                    <hr className="intro-divider"></hr>
                    <ul className="list-inline intro-social-buttons">
                      {signIn}
                      <li>
                        <a href="/#rooms" className="btn btn-default btn-lg" id="landing-joinroom"><i className="fa fa-music fa-fw"></i><span className="network-name">Start Listening!</span></a>
                      </li>
                      {signUp}
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

module.exports = LandingPageBody;