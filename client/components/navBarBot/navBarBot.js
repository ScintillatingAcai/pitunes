// navBarBot.js

var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;

var NavBarBotStyle = {
  position: "absolute",
  bottom: "0",
  left: "0",
  width: '100%',
  margin: '0px 0px 0px 0px',
  backgroundColor: '#222222',
  borderColor: '#444444'
};

var NavBarBot = React.createClass({
  render: function() {
    return (
      <Navbar style={NavBarBotStyle} brand='Built for Hack Reactor by Scintillating Acai, HR28, July 2015'>
      </Navbar>
    );
  }
});