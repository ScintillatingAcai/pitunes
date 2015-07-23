var dummyUsers = {
  0: 'John',
  1: 'Josh',
  2: 'Terry',
  3: 'Justin',
  4: 'Mark',
  5: 'Daniel',
  6: 'Nathan'
};

var arrUsers = [];
for (var key in dummyUsers) {
  arrUsers.push(dummyUsers[key]);
}

var Users = React.createClass({
  render: function() {
    var style = {
      cursor: 'pointer',
      marginBottom: '5px',
      padding: '0',
      margin: '0',
      color: 'grey',
      listStyleType: 'none'
    }
    var listItems = arrUsers.map((function(item, i) {
      return (
        <li style={style} data-id={i} key={i}>
          {item}
        </li>
      );
    }).bind(this));
    return (
      <ul >{listItems}</ul>
    );
  }
});

var UsersTitle = React.createClass({
  render: function() {
    var style = {
      textAlign: 'center',
      color: 'grey'
    };
    return (
      <h3 style={style}>Online Users</h3>
    );
  }
});

var OnlineUsers = React.createClass({
  render: function() {
    var style = {
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
        <UsersTitle />
        <Users />
      </div>
    );
  }
});