var SearchBar = React.createClass({

  getInitialState: function () {
    return {text: ''};
  },

  handleSubmit: function (e) {
    e.preventDefault();
    searchYouTube(this.state.text);
    this.setState({text: ''});
  },

  onChange: function (e) {
    e.preventDefault();
    this.setState({text: e.target.value});
  },
  render: function () {
    var style = {
      borderColor: '#EEEEEE',
      position: 'absolute',
      bottom: '0',
      width: '100%'
    };
    var searchBarInputStyle = {
      backgroundColor: '#AAAAAA',
      borderColor: '#EEEEEE'
    };

    return (
      <div>
        <ul id="searchResults"></ul>
        <form style={style} onSubmit={this.handleSubmit}>
          <input style={searchBarInputStyle} onChange={this.onChange} value={this.state.text} className="form-control" placeholder="Search YouTube"/>
        </form>
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