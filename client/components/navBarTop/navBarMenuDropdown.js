// navBarTop.js

var NavItem = ReactBootstrap.NavItem;
var MenuItem = ReactBootstrap.MenuItem;
var DropdownButton = ReactBootstrap.DropdownButton;

var DropdownStyle = {
  margin: '8px 0 0 0'
};

var NavBarMenuDropdown = React.createClass({
  render: function() {
    return (
     <DropdownButton style={DropdownStyle} title={<span className="glyphicon glyphicon-th-list" aria-hidden="true"></span>}>
       <MenuItem eventKey='1'>Sign Out</MenuItem>
       <MenuItem eventKey='2'>Profile</MenuItem>
     </DropdownButton>
    );
  }
});