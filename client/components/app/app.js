var user = null, 
    room = 'root', 
    server_uri = 'http://' + document.domain + ':3000'; 
    socket = io(server_uri);

var AppContainer = React.createClass({
  render: function(){
    var style = {
      WebkitTouchCallout: 'none',
      WebkitUserSelect: 'none',
      KhtmlUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none',
      userSelect: 'none'
    };
    return (
      <div style={style}>
        <LoginModal />
        <NavBarTop />
        <LeftContainer />
        <CenterContainer />
        <RightContainer />
        <NavBarBot />
      </div>
    );
  }
});

React.render(
  <div>
    <AppContainer />
  </div>,
  document.getElementsByClassName('appWrapper')[0]
);
