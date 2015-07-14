var LeftContainerStyle = {
  position: 'absolute',
  left: 0,
  minHeight: '100%',
  minWidth: '25%',
  margin: '0px 0px 0px 0px',
  backgroundColor: '#222222',
  border: '2px solid #444444',
  borderRadius: '2px'

};

var LeftContainer = React.createClass({
  render: function() {
    return (
      <div className="leftContainer" style={LeftContainerStyle}>
      </div>
    );
  }
});