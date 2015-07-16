var SearchBar = React.createClass({
  render: function() {
    var style = {
      margin: 'auto',
      marginTop: '300px',
      width: '97%',
    };
    var SearchBarInputStyle = {
      backgroundColor: '#AAAAAA',
      borderColor: '#EEEEEE'
    };
    return (
      <div style={style} className="input-group">
        <input style={SearchBarInputStyle} type="text" className="form-control" placeholder="Search YouTube" />
        <span className="input-group-addon"><span className="glyphicon glyphicon-search" aria-hidden="true"></span></span>
      </div>
    );
  }
});

var MediaAdd = React.createClass({
  render: function() {
    var style ={
      minHeight: '50%'
    };
    return (
      <div style={style}>
        <SearchBar />
      </div>
    );
  }
});