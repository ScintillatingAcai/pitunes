var React = require('react');
var $ = require('jquery');

var socket = io(window.location.origin);

var QueueList = React.createClass({
  componentDidMount: function () {
    var context = this;
    // this.props.model.on('reset:djQueue', function () {
    //   console.log(this.props.model.get('djQueue').models);
    //   console.log('QUEUE LIST HEARD CHANGE');
    //     context.handleRoomChange();
    // }.bind(this));

    this.props.model.on('room status', function () {
      console.log(this.props.model.get('djQueue').models);
      console.log('QUEUE LIST HEARD CHANGE');
        context.handleRoomChange();
    }.bind(this));
  },
  handleRoomChange: function () {
    this.forceUpdate();
  },
  render: function() {
    var style = {
      cursor: 'pointer',
      marginBottom: '5px',
      padding: '0',
      margin: '0',
      color: '#FFFFFF',
      listStyleType: 'none'
    };
    var listItems;
    if (this.props.model.get('djQueue').models.length > 0) {
      listItems = this.props.model.get('djQueue').models.map(function (item, i) {
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

var QueueTitle = React.createClass({
  render: function() {
    var style = {
      textAlign: 'center',
      color: '#FFF'
    };
    return (
      <h3 style={style}>Current Queue</h3>
    );
  }
});

var QueueJoinButton = React.createClass({
  getInitialState: function () {
    return {
      inQueue: this.props.inQueue,
      text: 'Join Queue'
    };
  },
  componentDidMount: function () {
    this.props.model.on('login', function () {
      $('#queueJoinButton').removeClass('disabled');
    });
    this.props.model.on('logout', function () {
      $('#queueJoinButton').addClass('disabled');
    });

    if (this.props.app.get('user').get('id') !== 0) {
      $('#queueJoinButton').removeClass('disabled');
    }
  },
  handleClick: function () {
    if (!this.state.inQueue) {
      socket.emit('user queue join', {user: this.props.app.get('user').attributes, room: this.props.app.get('current_room').get('id')});
      this.setState({inQueue: !this.state.inQueue, text: 'Leave Queue'})
    } else {
      socket.emit('user queue leave', {user: this.props.app.get('user').attributes, room: this.props.app.get('current_room').get('id')});
      this.setState({inQueue: !this.state.inQueue, text: 'Join Queue'})
      this.getText();
    }
  },
  getText: function () {
    if (!this.state.inQueue) {
      return 'Join Queue';
    } else {
      return 'Leave Queue';
    }
  },
  render: function () {
    return (
      <button id="queueJoinButton" className='btn btn-sm disabled' onClick={this.handleClick}>{this.state.text}</button>
    );
  }
});

var Queue = React.createClass({
  render: function() {
    var style = {
      background: '#222222',
      border: '1px solid #e7e7e7',
      position: 'absolute',
      width: '100%',
      height: '50%',
      overflow: 'auto'
    };
    var buttonStyle = {
      position: 'absolute',
      textAlign: 'center',
      width: '100%',
      bottom: '0',
      margin: '0 0 10px 0'
    }
    return (
      <div style={style}>
        <QueueTitle app={this.props.app}/>
        <QueueList model={this.props.app.get('current_room')} app={this.props.app}/>
        <div className='text-center' style={buttonStyle}>
        <QueueJoinButton model={this.props.app.get('user')} inQueue={false} app={this.props.app}/>
        </div>
      </div>
    );
  }
});

module.exports = Queue;
