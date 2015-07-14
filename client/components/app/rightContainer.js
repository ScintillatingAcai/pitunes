var RightContainerStyle = {
  position: 'absolute',
  right: 0,
  minHeight: '100%',
  minWidth: '25%',
  margin: '0px 0px 0px 0px',
  backgroundColor: '#222222',
  border: '2px solid #444444',
  borderRadius: '2px'
};

var RightContainer = React.createClass({
  render: function() {
    return (
      <div className="rightContainer" style={RightContainerStyle}>
      </div>
    );
  }
});