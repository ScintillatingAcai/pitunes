// navBarTop.js

var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;

var NavBarTop = React.createClass({
  render: function() {
    return (
      <Navbar inverse brand='piTunes'>
        <Nav className="navbar-right">
          <NavBarMenuDropdown />
       </Nav>  
      </Navbar>
    );
  }
});