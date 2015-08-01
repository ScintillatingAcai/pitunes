var React = require('react');

var Users = React.createClass({
  componentDidMount: function () {
    var context = this;
    this.props.app.on('room status', function () {
      context.handleRoomChange();
    }.bind(this));
  },
  componentWillUnmount: function () {
    this.props.app.off('room status');
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
      listStyleType: 'none',
      paddingLeft: '0px',
    };
    var listNoPadding = {
      paddingLeft: '0px',
      textAlign: 'center',
      fontSize: '18px'
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
        <ul style={listNoPadding}>{listItems}</ul>
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
      position: 'absolute',
      width: '100%',
      height: '50%',
      overflow: 'auto',
      bottom: '0',
      color: '#FFF',
      background: '#444444',
      border: '10px solid #222222',
      borderRadius: '40px'
    };
    return (
      <div style={style}>
        <UsersTitle app={this.props.app}/>
        <Users model={this.props.app.get('current_room')} app={this.props.app} />
      </div>
    );
  }
});

module.exports = OnlineUsers;