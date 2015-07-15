// mediaAdd.js

var SearchBarContainer = {
  marginLeft: '5px'
};

var SearchBarStyle = {
  margin: 'auto',
  width: '97%',
  position: 'absolute',
  top: '50%'
};

var MediaAdd = React.createClass({
  render: function() {
    return (
      <div style={SearchBarContainer}>
        <div style={SearchBarStyle} className="input-group">
          <input type="text" className="form-control" placeholder="Search YouTube" />
          <span className="input-group-addon"><span className="glyphicon glyphicon-search" aria-hidden="true"></span></span>
        </div>
      </div>
    );
  }
});

