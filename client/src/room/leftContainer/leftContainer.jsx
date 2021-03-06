var React = require('react');
var MediaAdd = require('./mediaAdd/mediaAdd.jsx');
var Playlist = require('./playlist/playlist.jsx')

var LeftContainer = React.createClass({
  render: function() {
    var style = {
      position: 'absolute',
      left: '0',
      width: '20%',
      margin: '0px 0px 0px 0px',
      backgroundColor: '#F8F8F8',
      // border: '1px solid #333',
      bottom: '0px',
      top: '50px',
      background: '#222'
    };
    return (
      <div style={style}>
        <MediaAdd app={this.props.app}/>
        <Playlist app={this.props.app}/>
      </div>
    );
  }
});

module.exports = LeftContainer;