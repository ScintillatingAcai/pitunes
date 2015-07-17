// navBarTop.js

var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;

var NavBarTopStyle = {
  backgroundColor: '#222222',
  borderColor: '#444444',
  margin: '0px 0px 0px 0px'
};

var DebuggerButtonTriggerNewCVO = React.createClass({
  handleClick: function () {
    $(document).trigger('newCVO');
  },
  render: function () {
    return (
      <button onClick={this.handleClick}>DEBUG TriggerNewCVO</button>
    );
  }
});

var DebuggerButtonRemVid = React.createClass({
  handleClick: function () {
    removeVideo();
  },
  render: function () {
    return (
      <button onClick={this.handleClick}>DEBUG RemVid</button>
    );
  }
});

var DebuggerButtonLoadVid = React.createClass({
  handleClick: function() {
     loadVideo('0_Pq0xYr3L4',10);
   },
  render: function() {
    return (
      <button onClick={this.handleClick}>LoadTestVid at 0:10</button>
    );
  }
});

var NavBarTop = React.createClass({
  render: function() {
    var style = {
      right: '0'
    };
    return (
      <div style={style}>
        <Navbar style={NavBarTopStyle} brand='πTunes'>
        <DebuggerButtonTriggerNewCVO />
        <DebuggerButtonRemVid />
        <DebuggerButtonLoadVid />
          <Nav className="navbar-right">
            <NavBarMenuDropdown />
         </Nav>  
        </Navbar>
      </div>
    );

  }
});