var React = require('react');
// var Shuffle = require('react-shuffle');
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
    var djStyle = {
      cursor: 'pointer',
      marginBottom: '5px',
      padding: '0',
      margin: '0',
      color: '#99DDFF',
      listStyleType: 'none'
    };
    var style = {
      cursor: 'pointer',
      marginBottom: '5px',
      padding: '0',
      margin: '0',
      color: '#FFFFFF',
      listStyleType: 'none'
    };
    var listNoPadding = {
      paddingLeft: '0',
      textAlign: 'center',
      fontSize: '18px'
    };
    var listItems = [];
    if ( this.props.app.get('current_room').get('currentDJ').get('id') ) {
      var context = this;
      var li = function() {
        return (
          <li style={djStyle} key={context.props.app.get('current_room').get('currentDJ').get('id')} >
            {context.props.app.get('current_room').get('currentDJ').get('display_name')}
          </li>
        );
      }();
      listItems.push(li);
    }
    if (this.props.model.get('djQueue').models.length > 0) {
      this.props.model.get('djQueue').each(function (item, i) {
        var li = function() {
          return (
            <li style={style} data-id={i} key={item.get('id')}>
              {item.get('display_name')}
            </li>
          );
        }();
        listItems.push(li);
      });
    }
    return (
      <ul style={listNoPadding}>
        {listItems}
      </ul>
      // <Shuffle style={listNoPadding}>
      //   {listItems}
      // </Shuffle>
    );
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
    if (this.props.app.isEnqueued()) {
      $('#queueJoinButton').prop('disabled', false);
      $('#queueJoinButton').removeClass('disabled');
    } else {
      if (this.props.app.isSignedIn() && this.props.app.get('user').get('current_playlist') && this.props.app.get('user').get('current_playlist').get('medias').length > 0) {
        $('#queueJoinButton').prop('disabled', false);
        $('#queueJoinButton').removeClass('disabled');
      } else {
        $('#queueJoinButton').prop('disabled', true);
        $('#queueJoinButton').addClass('disabled');
      }
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
    var style={
      background: '#99DDFF',
      borderRadius: '10px',
      outline: 'none'
    }
    return (
      <button id="queueJoinButton" className='btn btn-md' style={style} onClick={this.handleClick}>{this.state.text}</button>
    );
  }
});

var Queue = React.createClass({
  render: function() {
    var style = {
      position: 'absolute',
      width: '100%',
      height: '50%',
      overflow: 'auto',
      background: '#444444',
      border: '10px solid #222222',
      borderRadius: '40px'
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
