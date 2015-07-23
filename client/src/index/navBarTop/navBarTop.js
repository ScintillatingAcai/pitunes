// navBarTop.js

var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;

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
    socket.emit('user queue join', {user: user, room: 1});
  },
  render: function () {
    return (
      <button onClick={this.handleClick}>Join Queue</button>
    );
  }
});

var DebuggerButtonLeaveQueue = React.createClass({
  handleClick: function () {
    socket.emit('user queue leave', {user: user, room: 1});
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
    socket.emit('user room join', {user: user, room: 1})
  },
  render: function () {
    return (
      <button onClick={this.handleClick}>Join Room</button>
    );
  }
});

var DebuggerButtonLeaveRoom = React.createClass({
  handleClick: function () {
    socket.emit('user room leave', {user: user, room: 1})
  },
  render: function () {
    return (
      <button onClick={this.handleClick}>Leave Room</button>
    );
  }
});

var NavBarTop = React.createClass({
  render: function() {
    var style = {
      background: '#222222',
      border: '2px solid #444444',
      position: 'absolute', 
      width: '100%',
      height: '8%'
    };
    var titleStyle = {
      height:'100%',
      color: 'grey',
      fontSize: '200%',
      marginLeft: '7%'
    };
    var debuggerButtonsStyle = {
      right: '30%',
      top: '10%',
      height: '100%',
      position: 'absolute'
    };
    var NavBarMenuDropdownStyle = {
      right: '6%',
      top: '0',
      position: 'absolute',
    };
    var piStyle = {
      color: '#FFF'
    };
    var tunesStyle = {
      color: '#CC0000'
    };
    return (
      <div style={style}>
        <div style={titleStyle}><span style={piStyle}>pi</span><span style={tunesStyle}>TUNES</span></div>
        <div style={debuggerButtonsStyle}>
          <DebuggerButtonGetCurPlaylist />
          <DebuggerButtonSimVideoDesync />
          <DebuggerButtonJoinQueue />
          <DebuggerButtonLeaveQueue />
          <DebuggerButtonJoinRoom />
          <DebuggerButtonLeaveRoom />
        </div>
        <div style = {NavBarMenuDropdownStyle}>
          <NavBarMenuDropdown />
        </div>
      </div>
    );

  }
});