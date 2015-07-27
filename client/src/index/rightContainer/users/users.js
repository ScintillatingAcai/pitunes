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
  componentDidMount: function () {
    var context = this;
    this.props.model.on('change:users', function () {
      console.log(this.props.model.get('users').models);
      console.log('USERS LIST HEARD CHANGE');
        context.handleRoomChange();
    }.bind(this));

    // this.props.model.on('room status', function () {
    //   console.log(this.props.model.get('users').models);
    //   console.log('USERS LIST HEARD CHANGE');
    //     context.handleRoomChange();
    // }.bind(this));
  },
  handleRoomChange: function () {
    this.forceUpdate();
  },
  render: function () {
    var style = {
      cursor: 'pointer',
      marginBottom: '5px',
      padding: '0',
      margin: '0',
      color: '#FFF',
      listStyleType: 'none'
    };
    var listItems;
    if (this.props.model.get('users').models.length > 0) {
      listItems = this.props.model.get('users').models.map(function (item, i) {
        return (
          <li style={style} data-id={i} key={i}>
            {item.get('display_name')}
          </li>
        );
      });
      return (
        <ul>{listItems}</ul>
      );
    } else {
      // listItems = ["No one in room"].map(function (item, i) {
      //   return (
      //     <li style={style} data-id={i} key={i}>
      //       {item}
      //     </li>
      //   );
      // });
      // return (
      //   <ul>{listItems}</ul>
      // );
      return (
        <ul></ul>
      );
    }
  }
});

var UsersTitle = React.createClass({
  render: function() {
    var style = {
      textAlign: 'center',
      color: '#FFF'
    };
    return (
      <h3 style={style} >Online Users</h3>
    );
  }
});

var OnlineUsers = React.createClass({
  render: function() {
    var style = {
      background: '#222222',
      border: '1px solid #e7e7e7  ',
      position: 'absolute',
      width: '100%',
      height: '50%',
      overflow: 'auto',
      bottom: '0',
      color: '#FFF'
    };
    return (
      <div style={style}>
        <UsersTitle />
        <Users model={app.get('current_room')} />
      </div>
    );
  }
});