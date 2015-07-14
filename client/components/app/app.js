// app.js

var ContainerStyle = {
  'minHeight': '100%'
};

// navBarBot.js
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

React.render(
  <div style={ContainerStyle}>
    <NavBarTop />
    <LeftContainer />
    <CenterContainer />
    <RightContainer />
    <NavBarBot />
  </div>,
  document.getElementsByClassName('appWrapper')[0]
);