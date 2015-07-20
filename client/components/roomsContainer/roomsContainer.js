var user = null, 
    room = 'root', 
    server_uri = 'http://' + document.domain + ':3000'; 
    socket = io(server_uri);

var Modal = ReactBootstrap.Modal;
var Input = ReactBootstrap.Input;
var Button = ReactBootstrap.Button;

var RoomsContainer = React.createClass({
    getInitialState: function() {
      this.getRooms();
      return null;
    },
    getRooms: function() {
      var that = this;
      $.ajax({
              url: server_uri + '/api/rooms',
              type: 'GET',
              dataType: 'json',
              success: function(res) {
                that.setState({rooms: res});
              }, error: function(res) {
                console.err(res);
              }
            });
    },
    render: function() {
        return (
            <div>
            <nav className="navbar navbar-default navbar-fixed-top topnav" role="navigation">
                <div className="container topnav">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand topnav" href="landingPage.html"><span className="j-color-blue">pi</span>Tunes</a>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <a href="landingPage.html">Home</a>
                            </li>
                            <li>
                                <a href="#rooms">Rooms</a>
                            </li>
                            <li>
                                <a className="j-pointer" onClick={this.loginClick}>Sign In</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <a name="rooms"></a>
            <div className="content-section-a">

                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-sm-4">
                            <div className="clearfix"></div>
                            <h2 className="section-heading j-center-text">Random Room 1 <br />DJs:</h2>
                            <div className="j-left-25">
                                <img className="img-responsive" src="assets/img/ipad.png" alt="" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-4">
                            <div className="clearfix"></div>
                            <h2 className="section-heading j-center-text">Random Room 2<br />DJs:</h2>
                            <div className="j-left-25">
                                <img className="img-responsive" src="assets/img/ipad.png" alt="" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-4">
                            <div className="clearfix"></div>
                            <h2 className="section-heading j-center-text">Random Room 3<br />DJs:</h2>
                            <div className="j-left-25">
                                <img className="img-responsive" src="assets/img/ipad.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 j-center-text">
                            <ul className="list-inline">
                                <li>
                                    <a href="#home">Home</a>
                                </li>
                                <li className="footer-menu-divider">&sdot;</li>
                                <li>
                                    <a href="#about">About</a>
                                </li>
                                <li className="footer-menu-divider">&sdot;</li>
                                <li>
                                    <a href="#services">Services</a>
                                </li>
                                <li className="footer-menu-divider">&sdot;</li>
                                <li>
                                    <a href="#contact">Contact</a>
                                </li>
                            </ul>
                            <p className="copyright text-muted small">Copyright &copy; Scintillating Açaí 2015. All Rights Reserved</p>
                        </div>
                    </div>
                </div>
            </footer>

            </div>
        );
    }
});

React.render(
    <div>
        <RoomsContainer />
    </div>,
  document.getElementsByClassName('roomsContainer')[0]
);