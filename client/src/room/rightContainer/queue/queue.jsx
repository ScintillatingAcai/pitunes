var React = require('react');
var $ = require('jquery');

var socket = io(window.location.origin);

var QueueList = React.createClass({
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
      text: 'Join Queue'
    };
  },
  componentDidMount: function () {
    var context = this;
    this.props.app.on('room status', function () {
      context.updateForUserStatus();
    }.bind(this));

    this.props.app.get('user').on('change:current_playlist', function () {
      this.updateForUserStatus();
    }.bind(this));

    this.props.app.get('user').on('newSong', function () {
      this.updateForUserStatus();
    }.bind(this));

    this.props.app.on('userSignInOut', this.updateForUserStatus);
    this.props.app.on('userEnquededDequeued', this.updateForUserStatus);
    this.updateForUserStatus();
  },
  componentWillUnmount: function () {
    this.props.app.off('room status');
    this.props.app.get('user').off('newSong');
    this.props.app.get('user').off('change:current_playlist');
    this.props.app.off('userSignInOut');
    this.props.app.off('userEnquededDequeued');
  },
  updateForUserStatus: function () {
    if (this.props.app.isSignedIn() && this.props.app.get('user').get('current_playlist').get('medias').length > 0) {
      $('#queueJoinButton').removeClass('disabled');
    } else {
      $('#queueJoinButton').addClass('disabled');
    }
    this.updateButtonText();
  },
  updateButtonText: function () {
    if (this.props.app.isEnqueued()) {
      this.setState({text: 'Leave Queue'})
    } else {
      this.setState({text: 'Join Queue'})
    }
  },
  handleClick: function () {
    if (!this.props.app.isEnqueued()) {
      socket.emit('user queue join', {user: this.props.app.get('user').attributes, room: this.props.app.get('current_room').get('id')});
    } else {
      socket.emit('user queue leave', {user: this.props.app.get('user').attributes, room: this.props.app.get('current_room').get('id')});
    }
    this.updateForUserStatus();
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
        <QueueJoinButton model={this.props.app.get('user')} app={this.props.app}/>
        </div>
      </div>
    );
  }
});

module.exports = Queue;
