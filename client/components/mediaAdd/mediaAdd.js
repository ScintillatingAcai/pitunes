// mediaAdd.js

var MediaAdd = React.createClass({
  render: function() {
    return (
      <div id="buttons">
            <label> <input id="query" value='cats' type="text"/><button id="search-button" disabled onclick="search()">Search</button></label>
          </div>
      <div id="search-container">
      </div>
    );
  }
});

