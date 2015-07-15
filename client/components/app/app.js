var Styling = React.createClass({
  render: function(){
    var style = {
      '-webkit-touch-callout': 'none',
      '-webkit-user-select': 'none',
      '-khtml-user-select': 'none',
      '-moz-user-select': 'none',
      '-ms-user-select': 'none',
      'user-select': 'none'
    };
    return (
      <div style={style}>
        <NavBarTop />
        <LeftContainer />
        <CenterContainer />
        <RightContainer />
        <NavBarBot />
      </div>
    );
  }
})

React.render(
  <div>
    <Styling />
  </div>,
  document.getElementsByClassName('appWrapper')[0]
);