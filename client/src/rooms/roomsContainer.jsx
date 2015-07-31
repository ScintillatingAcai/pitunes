var React = require('react');
var $ = require('jquery');

var NavigationController = require('../navigation/navigationController.jsx');
var RoomsCollection = require('../data/collections/rooms.js');
var RoomModel = require('../data/models/room.js');
var CreateRoomModal = require('./createRoomModal.jsx');
var roomsCollection = new RoomsCollection();
var source =  window.location.origin + '/api/rooms';

var RoomsView = React.createClass({
  getInitialState: function() {
    return { errorMessage: '', showCreateRoomModal: false };
  },
  showCreateRoom: function() {
    this.setState({ showCreateRoomModal: true });
  },
  createRoomClick: function() {
    var form = document.getElementById('createRoom-form');
    var self = this;
    if (this.props.app.isSignedIn() === false) {
      this.setState({ errorMessage: 'You must be logged in to create a room' });
      return;
    }
    if (form[0].value.length > 25) { this.setState({ errorMessage: 'Your room name must be smaller than 25 characters' });
      return;
    }
    $.ajax({
      type: 'POST',
      url: source,
      dataType: 'JSON',
      data: {name: form[0].value},
      success: function(res) {
        self.setState({ showCreateRoomModal: false, errorMessage: '' });
        location.reload();
        window.location.href = '/#/room/' + res.id;
      }
    });
  },
  close: function() {
    this.setState({ showCreateRoomModal: false, errorMessage: '' });
  },
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
          room.videoURL = '../../assets/img/no-dj.png';
          roomsCollection.add(new RoomModel(room));
        } else {
          room.videoURL = 'https://i.ytimg.com/vi/' + room.currentMedia.youtube_id + '/hqdefault.jpg';
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
    var form = null;
    if (this.props.app.isSignedIn() === true) {
      form = (<a type="submit" className="btn btn-default btn-md" onClick={this.showCreateRoom}><i className="fa fa-pencil fa-fw"></i><span className="network-name">Create Room</span></a>);
    }
    return (
      <div>
        <NavigationController app={this.props.app}/>
        <a name="room"></a>
        <div className="content-section-a">
          <div className="container">
          <div className="j-createRoom-button">
            {form}
          </div>
            <div className="row j-padding-top-100px">
              { <Rooms /> }
            </div>
            <CreateRoomModal showCreateRoomModal={this.state.showCreateRoomModal} createRoomClick={this.createRoomClick} errorMessage={this.state.errorMessage} close={this.close} />
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
              <div className="col-lgfap-4 col-sm-3 j-pointer j-padding-bot-50 gradientBoxesWithOuterShadows" key={room.get('id')}  onClick={self.roomClick.bind(self, room.get('id'))}>
                <div className="clearfix"></div>
                <h2 className="section-heading j-center-text j-roomDisplay">{room.get('name')} <br />Current DJs: {room.get('usersCount')}</h2>
                <div className="j-left-25">
                  <img className="img-responsive j-max-height-216px j-room-image-display" src={room.get('videoURL')} alt="" />
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
