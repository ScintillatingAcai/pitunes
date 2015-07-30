var React = require('react');

var LandingPagePopularRooms = React.createClass({
  componentDidMount: function() {
    $.get(window.location.origin + '/api/rooms?top=3', function(res) {
      res.forEach(function(room) {

      })
    });
  },
  render: function() {
    var imageSource;
    return (
      <div className="content-section-a">
        <div className="container">
          <div className="row">

          </div>
        </div>
      </div>
    );
  }
});

module.exports = LandingPagePopularRooms;

// {
//   data.map(function(room) {
//     room.currentMedia.youtube_id !== null ? imageSource = 'https://i.ytimg.com/vi/' + room.currentMedia.youtube_id + '/hqdefault.jpg' : imageSource = '../../../assets/img/no-dj.png'
//     return (
//       <div className="col-lg-4 col-sm-4">
//         <div className="clearfix"></div>
//         <h2 className="section-heading j-center-text">{room.name}<br />DJs: {room.usersCount}</h2>
//         <div className="j-left-25">
//           <img className="img-responsive j-max-height-216px" src={imageSource} alt="" />
//         </div>
//       </div>
//     )
//   })
// }