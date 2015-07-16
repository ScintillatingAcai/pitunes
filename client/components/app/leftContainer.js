var LeftContainer = React.createClass({
  render: function() {
    var style = {
      position: 'absolute',
      left: '0',
      minHeight: '88%',
      width: '25%',
      margin: '0px 0px 0px 0px',
      backgroundColor: '#222222',
      border: '2px solid #444444',
      bottom: '4%'
    };
    return (
      <div style={style}>
        <PlaylistSavedContainer />
        <MediaAddContainer />
      </div>
    );
  }
});