// navBarTop.js

var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;

var NavBarTopStyle = {
  backgroundColor: '#222222',
  borderColor: '#444444',
  margin: '0px 0px 0px 0px'
};

var NavBarTop = React.createClass({
  render: function() {
    return (
      <Navbar style={NavBarTopStyle} brand='πTunes'>
        <Nav className="navbar-right">
          <NavBarMenuDropdown />
       </Nav>  
      </Navbar>
    );
  }
});