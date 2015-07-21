var user = null, 
    room = 'root', 
    server_uri = 'http://' + document.domain + ':3000'; 
    socket = io(server_uri);

var Modal = ReactBootstrap.Modal;
var Input = ReactBootstrap.Input;
var Button = ReactBootstrap.Button;
var rooms;

var RoomsContainer = React.createClass({
    getInitialState: function() {
        return { rooms: [] };
    },
    componentDidMount: function() {
        var that = this;
        $.get(this.props.source, function(res){
            var rooms = res;
            if (this.isMounted()) {
              this.setState({
                rooms: rooms
              });
            }
        }.bind(this));
    },
    render: function() {
        rooms = this.state.rooms || [];
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
                        {
                            rooms.map(function(room){
                                return (
                                    <div>
                                        <h3 className="j-center-text">{room.name} <br />Current DJs: {room.usersCount}</h3>
                                        <hr />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 j-center-text">
                            <ul className="list-inline">
                                <li>
                                    <a href="landingPage.html">Home</a>
                                </li>
                                <li className="footer-menu-divider">&sdot;</li>
                                <li>
                                    <a href="#about">About</a>
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
        <RoomsContainer source={server_uri + '/api/rooms'} />
    </div>,
  document.getElementsByClassName('roomsContainer')[0]
);