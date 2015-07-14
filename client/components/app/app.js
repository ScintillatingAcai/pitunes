// app.js
ContainerStyle = {
  'minHeight': '100%'
}
React.render(
  <div style={ContainerStyle}>
    <NavBarTop />
    <NavBarBot />
  </div>,
  document.getElementsByClassName('appWrapper')[0]
);