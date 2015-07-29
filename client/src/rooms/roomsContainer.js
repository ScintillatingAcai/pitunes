var React = require('react');
var RoomsCollection = require('../data/collections/rooms.js');
var RoomModel = require('../data/models/room.js');
var roomsCollection = new RoomsCollection();
var source = 'http://' + document.domain + ':3000/api/rooms';

var RoomsView = React.createClass({
    //Event listener for changes to roomsCollection
    componentDidMount: function() {
        roomsCollection.on('change', function() {
            this.forceUpdate();
        }.bind(this));
        var self = this;
        $.get(source, function(res) {
          res.forEach(function(room) {
            //check if there 'currentMedia' is null and if it's not, create a url property for the video thumbnail
            if (room.currentMedia === null) {
              //TODO: ADD A DEFAULT IMAGE FOR ROOMS THAT ARE NOT PLAYING MUSIC
              roomsCollection.add(new RoomModel(room));
            } else {
              room.videoURL = 'https://i.ytimg.com/vi/' + room.currentMedia + '/hqdefault.jpg';
              roomsCollection.add(new RoomModel(room));
            }
          });
          self.forceUpdate();
        })
      .fail(function() {
        console.log('error with GET request to ' + source);
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
                        <a className="navbar-brand topnav" href="#/"><span className="j-color-black">pi</span><span className="j-color-blue">Tunes</span></a>
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
                                    <a href="#/">Home</a>
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
        window.location.href = 'http://' + document.domain + ':3000/#/room/' + id;
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
                                <h2 className="section-heading j-center-text" onClick={self.roomClick.bind(this, room.get('id'))}>{room.get('name')} <br />Current DJs: {room.get('usersCount')}</h2>
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

module.exports = RoomsView;