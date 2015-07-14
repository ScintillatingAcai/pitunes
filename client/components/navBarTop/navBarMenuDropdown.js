// navBarTop.js

var NavItem = ReactBootstrap.NavItem;
var MenuItem = ReactBootstrap.MenuItem;
var DropdownButton = ReactBootstrap.DropdownButton;

var DropdownStyle = {
  backgroundColor: '#888888',
  borderColor: '#444444',
  margin: '8px 0px 0px 0px',
};

var MenuItemStyle = {

};

var NavBarMenuDropdown = React.createClass({
  render: function() {
    return (
     <DropdownButton style={DropdownStyle} title={<span className="glyphicon glyphicon-th-list" aria-hidden="true"></span>}>
       <MenuItem style={MenuItemStyle} eventKey='1'>Sign Out</MenuItem>
       <MenuItem style={MenuItemStyle} eventKey='2'>Profile</MenuItem>
     </DropdownButton>
    );
  }
});