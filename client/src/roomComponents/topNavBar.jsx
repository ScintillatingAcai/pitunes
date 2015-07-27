var TestTopNavBar = React.createClass({
  render: function() {
    //TODO: IF SIGNED IN, INSTEAD OF SIGN IN BUTTON, SHOW SIGN OUT BUTTON.
    var style = {
      right: '30%',
      top: '10%',
      height: '100%',
      position: 'absolute'
    };
    return (
      <nav className="navbar navbar-default navbar-fixed-top topnav" role="navigation">
        <div className="container topnav">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand topnav" href="landingPage.html"><span className="j-color-black">pi</span><span className="j-color-blue">Tunes</span></a>
          </div>
          <div style={style}>
            <DebuggerButtonSimVideoDesync />
            <DebuggerButtonJoinRoom />
            <DebuggerButtonLeaveRoom />
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="landingPage.html">Home</a>
              </li>
              <li>
                <a href="rooms.html">Rooms</a>
              </li>
              <li>
                <a className="j-pointer" onClick={this.props.signInClick}>Sign In</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});