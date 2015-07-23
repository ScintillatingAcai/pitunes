var user = null, 
    room = 'root', 
    server_uri = 'http://' + document.domain + ':3000'; 
    socket = io(server_uri);

var Modal = ReactBootstrap.Modal;
var Input = ReactBootstrap.Input;
var Button = ReactBootstrap.Button;

var RoomsContainer = React.createClass({
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
                        <a className="navbar-brand topnav" href="landingPage.html"><span className="j-color-black">pi</span><span className="j-color-blue">Tunes</span></a>
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
                        { <Rooms /> }
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
                            <p className="copyright text-muted small">Copyright &copy; 2015, Scintillating Açaí, All Rights Reserved</p>
                        </div>
                    </div>
                </div>
            </footer>

            </div>
        );
    }
});

var Rooms = React.createClass({
    roomClick: function(id) {
        //TODO: SEND USER TO THE ROOM WITH THE ID CLICKED
        console.log('clicked room id is: ' + id);
    },
    render: function() {
        var self = this;
        return (
            <div className="container">
                <div className="row">
                    {roomsCollection.map(function(room){
                        return (
                            <div className="col-lg-4 col-sm-4">
                                <div className="clearfix"></div>
                                <h2 className="section-heading j-center-text" onClick={self.roomClick.bind(this, room.get('id'))}>{room.get('name')} <br />Current DJs: {room.get('userCount')}</h2>
                                <div className="j-left-25">
                                    <img className="img-responsive" src={room.get('videoURL')} alt="" />
                                </div>
                            </div>
                        )
                    })}
                </div>
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