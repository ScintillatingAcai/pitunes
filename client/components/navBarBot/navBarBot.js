var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;

var NavBarBotStyle = {
  position: "absolute",
  bottom: "0",
  left: "0",
  width: '100%',
  margin: '0px 0px 0px 0px',
  backgroundColor: '#222222',
  border: '2px solid #444444',
  borderRadius: '2px',
  display: 'inline',
  height: '4%',
  color: '#888',
  textAlign: 'center'
};

var NavBarBot = React.createClass({
  render: function() {
    return (
      <div style={NavBarBotStyle}><p>Built for Hack Reactor by Scintillating Acai, HR28, July 2015</p></div>
    );
  }
});