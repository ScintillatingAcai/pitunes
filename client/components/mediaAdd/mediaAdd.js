// mediaAdd.js

var SearchBarContainer = {
  height: '50%',
};

var SearchBarStyle = {
  margin: 'auto',
  marginTop: '300px',
  width: '97%',
};

var SearchBarInputStyle = {
  backgroundColor: '#AAAAAA',
  borderColor: '#EEEEEE'
};

var MediaAdd = React.createClass({
  render: function() {
    return (
      <div style={SearchBarContainer}>
        <div style={SearchBarStyle} className="input-group">
          <input style={SearchBarInputStyle} type="text" className="form-control" placeholder="Search YouTube" />
          <span className="input-group-addon"><span className="glyphicon glyphicon-search" aria-hidden="true"></span></span>
        </div>
      </div>
    );
  }
});