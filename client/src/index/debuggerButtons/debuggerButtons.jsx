var React = require('react');

var server_uri = 'http://' + document.domain + ':3000',
  socket = io(server_uri);

//TODO: fix this to pull the real app
var AppModel = require('../../data/models/app.js');
var app = new AppModel();

var DebuggerButtonGetCurPlaylist = React.createClass({
  handleClick: function () {
    getCurrentPlaylist();
  },
  render: function () {
    return (
      <button onClick={this.handleClick}>Get User Current Playlist</button>
    );
  }
});

var DebuggerButtonJoinQueue = React.createClass({
  handleClick: function () {
    socket.emit('user queue join', { user: app.get('user').attributes, room: 1 });
  },
  render: function () {
    return (
      <button onClick={this.handleClick}>Join Queue</button>
    );
  }
});

var DebuggerButtonLeaveQueue = React.createClass({
  handleClick: function () {
    socket.emit('user queue leave', {user: app.get('user').attributes, room: 1});
  },
  render: function () {
    return (
      <button onClick={this.handleClick}>Leave Queue</button>
    );
  }
});

var DebuggerButtonSimVideoDesync = React.createClass({
  handleClick: function () { 
    setVideoTime(3);
  },
  render: function () {
    return (
      <button onClick={this.handleClick}>Sim Desync</button>
    );
  }
});

var DebuggerButtonJoinRoom = React.createClass({
  handleClick: function () {
    socket.emit('user room join', { user: app.get('user').attributes, room: 1 })
    app.get('current_room').set('id', 1);
  },
  render: function () {
    return (
      <button onClick={this.handleClick}>Join Room</button>
    );
  }
});

var DebuggerButtonLeaveRoom = React.createClass({
  handleClick: function () {
    socket.emit('user room leave', { user: app.get('user').attributes, room: 1 })
  },
  render: function () {
    return (
      <button onClick={this.handleClick}>Leave Room</button>
    );
  }
});

var DebuggerButtons = React.createClass({
  render: function() {
    var style = {
      right: '30%',
      top: '10%',
      height: '100%',
      position: 'absolute'
    };
    return (
        <div style={style}>
          <DebuggerButtonGetCurPlaylist />
          <DebuggerButtonSimVideoDesync />
          <DebuggerButtonJoinQueue />
          <DebuggerButtonLeaveQueue />
          <DebuggerButtonJoinRoom />
          <DebuggerButtonLeaveRoom />
        </div>
    );
  }
});

module.exports = DebuggerButtons;