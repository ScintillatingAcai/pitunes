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
              room.videoURL = '../../assets/img/no-dj.png';
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
                <a name="rooms"></a>
                <div className="content-section-a">
                    <div className="container">
                        <div className="row">
                            { <Rooms /> }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var Rooms = React.createClass({
    roomClick: function(id) {
        window.location.href = '/#/room/' + id;
    },
    render: function() {
        var self = this;
        return (
            <div className="container">
                <div className="row">
                    {roomsCollection.map(function(room){
                        return (
                            <div className="col-lg-4 col-sm-4 j-pointer" key={room.get('id')}  onClick={self.roomClick.bind(self, room.get('id'))}>
                                <div className="clearfix"></div>
                                <h2 className="section-heading j-center-text">{room.get('name')} <br />Current DJs: {room.get('usersCount')}</h2>
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