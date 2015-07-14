var CenterContainerStyle = {
  position: 'absolute',
  left: '25%',
  minHeight: '100%',
  minWidth: '50%',
  margin: '0px 0px 0px 0px',
  backgroundColor: '#222222',
  border: '2px solid #444444',
  borderRadius: '2px'
};

var CenterContainer = React.createClass({
  render: function() {
    return (
      <div className="centerContainer" style={CenterContainerStyle}>
      </div>
    );
  }
});