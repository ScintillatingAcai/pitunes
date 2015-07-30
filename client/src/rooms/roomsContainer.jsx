var React = require('react');
var $ = require('jquery');
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
    console.log('createRoom has been clicked. make sure to send a post request with the information');
    var form = document.getElementById('createRoom-form');
    var self = this;
    $.ajax({
      type: 'POST',
      url: source,
      dataType: 'JSON',
      data: {name: form[0].value},
      success: function(res) {
        self.forceUpdate();
        window.location.href = '/#/room/' + res.id;
      }
    });
  },
  close: function() {
    this.setState({ showCreateRoomModal: false , errorMessage: '' });
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
    return (
      <div>
        <a name="room"></a>
        <div className="content-section-a">
          <div className="container">
          <div className="j-createRoom-button">
            <a type="submit" className="btn btn-default btn-md" onClick={this.showCreateRoom}><i className="fa fa-pencil fa-fw"></i><span className="network-name">Create Room</span></a>
          </div>
            <div className="row j-padding-top-100px">
              { <Rooms /> }
            </div>
          </div>
          <CreateRoomModal showCreateRoomModal={this.state.showCreateRoomModal} createRoomClick={this.createRoomClick} errorMessage={this.props.errorMessage} close={this.close} />
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
                  <img className="img-responsive j-max-height-216px" src={room.get('videoURL')} alt="" />
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
