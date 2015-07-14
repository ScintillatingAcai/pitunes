// app.js

ContainerStyle = {
  'minHeight': '100%'
}

React.render(
  <div style={ContainerStyle}>
    <NavBarTop />
    <VideoPlayer />
    <NavBarBot />
  </div>,
  document.getElementsByClassName('appWrapper')[0]
);