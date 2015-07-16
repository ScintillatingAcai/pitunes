var SearchBar = React.createClass({
  render: function() {
    var style = {
      margin: 'auto',
      marginTop: '1%',
      width: '97%'
    };
    var searchBarInputStyle = {
      backgroundColor: '#AAAAAA',
      borderColor: '#EEEEEE'
    };
    return (
      <div style={style} className="input-group">
        <input style={searchBarInputStyle} type="text" className="form-control" placeholder="Search YouTube" />
        <span className="input-group-addon"><span className="glyphicon glyphicon-search" aria-hidden="true"></span></span>
      </div>
    );
  }
});

var MediaAdd = React.createClass({
  render: function() {
    var style ={
      background: '#222222',
      border: '2px solid #444444',
      position: 'absolute', 
      width: '100%',
      height: '50%',
      overflow: 'auto',
      bottom: '0'
    };
    return (
      <div style={style}>
        <SearchBar />
      </div>
    );
  }
});