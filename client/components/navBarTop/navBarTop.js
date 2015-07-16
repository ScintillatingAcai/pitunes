// navBarTop.js

var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;

var NavBarTopStyle = {
  backgroundColor: '#222222',
  borderColor: '#444444',
  margin: '0px 0px 0px 0px'
};

var DebuggerButtonRemVid = React.createClass({
  handleClick: function () {
    removeVideo();
  },
  render: function () {
    return (
      <button onClick={this.handleClick}>DEBUG RemVid</button>
    )
  }
});

var DebuggerButtonLoadVid = React.createClass({
  handleClick: function() {
     loadVideo('f2bb_0P4rCM');
   },
  render: function() {
    return (
    <button onClick={this.handleClick}>DEBUG LoadTestVid</button>
    )
  }
});

var NavBarTop = React.createClass({
  render: function() {
    return (
      <Navbar style={NavBarTopStyle} brand='πTunes'>
        <Nav className="navbar-right">
          <NavBarMenuDropdown />
          <DebuggerButtonRemVid />
          <DebuggerButtonLoadVid />
       </Nav>  
      </Navbar>
    );
  }
});