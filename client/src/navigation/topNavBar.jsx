var React = require('react');
var $ = require('jquery');

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
      $('.signInOutIcon').removeClass('fa-sign-in').addClass('fa-sign-out');
      this.setState({ displayName: this.props.app.get('user').get('display_name') });
    } else {
      this.setState({ buttonText: 'Sign In'});
      $('.signInOutIcon').removeClass('fa-sign-out').addClass('fa-sign-in');
      this.setState({ displayName: this.props.app.get('user').get('display_name') });
    }
  },
  render: function () {
    return (
      <nav className="navbar navbar-default navbar-fixed-top darkgrey-background topnav" role="navigation">
        <div className="container topnav">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand topnav" href="#/"><span className="j-color-white">pi</span><span className="j-color-blue">Tunes</span></a>
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
                <a className="j-pointer" onClick={this.props.signInOutClick}><i className="signInOutIcon fa fa-sign-in fa-fw"></i>{this.state.buttonText}</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = TopNavBar;
