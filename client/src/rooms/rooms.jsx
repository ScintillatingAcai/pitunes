var React = require('react');

module.exports.RoomsView = React.createClass({
  componentDidMount: function() {
    roomsCollection.on('change', function() {
      this.forceUpdate();
    }.bind(this));
  },
  render: function() {
    return (
      <div className="content-section-a">
          <div className="container">
              <div className="row">
                  { <Rooms /> }
              </div>
          </div>
      </div>
    );
  }
});

module.exports.Rooms = React.createClass({
  roomClick: function(id) {
    /*
      TODO: SEND USER TO THE ROOM WITH THE ID THAT WAS CLICKED
    **/
    console.log('clicked room id is ' + id);
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