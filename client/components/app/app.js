// app.js
var ContainerStyle = {
  'minHeight': '100%'
};

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