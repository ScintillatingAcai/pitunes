var React = require('react');

var TopNavBar = React.createClass({
  getInitialState: function () {
    return ({ buttonText: 'Sign In' , displayName: '' });
  },
  componentDidMount: function () {
    this.props.app.on('userSignInOut', this.updateForSignInStatus);
    this.updateForSignInStatus();
  },
  componentWillUnmount: function () {
    this.props.app.off('userSignInOut');
  },
  updateForSignInStatus: function () {
    if (this.props.app.isSignedIn()) {
      this.setState({ buttonText: 'Sign Out' });
      this.setState({ displayName: this.props.app.get('user').get('display_name') });
    } else {
      this.setState({ buttonText: 'Sign In'});
    }
  },
  render: function () {
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
            <a className="navbar-brand topnav" href="#/"><span className="j-color-black">pi</span><span className="j-color-blue">Tunes</span></a>
          </div>
          <div className>
            <a className="navbar-brand topnav">{this.state.displayName}</a>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="#/">Home</a>
              </li>
              <li>
                <a href="#/rooms">Rooms</a>
              </li>
              <li>
                <a className="j-pointer" onClick={this.props.signInOutClick}>{this.state.buttonText}</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = TopNavBar;
