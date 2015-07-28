var React = require('react');

var app = require('../../../roomComponents/loginController.jsx');

var server_uri = 'http://' + document.domain + ':3000',
  socket = io(server_uri);

var ChatList = React.createClass({
  render: function() {
    var style = {
      color: '#FFF',
      listStyleType: 'none',
      bottom: '0',
      maxHeight: '100%',
      marginBottom: '0px'
    };
    var createItem = function(itemText, index) {
      return <li key={index + itemText}>{itemText}</li>;
    };
    return <ul style={style}>{this.props.items.map(createItem)}</ul>;
  }
});

var Chat = React.createClass({
  getInitialState: function() {
    socket.on('user message', function(data){
      var nextItems = this.state.items.concat([data.displayName + ': ' + data.message]);
      this.setState({ items: nextItems });
    }.bind(this));

    // socket.on('user room change', function(data){
    //   console.log('user room change: ', JSON.parse(data));
    //   app.get('current_room').get('users').set(JSON.parse(data));
    //   app.get('current_room').trigger('userRoomChange');
    // }.bind(this));

    socket.on('room status', function(data){
      console.log('room status: ', data);
      app.get('current_room').updateForRoomStatus(data);
      // console.log('updated room info: ', app.get('current_room'));
      app.get('current_room').trigger('room status');
    }.bind(this));

    // socket.on('user queue change', function(data){
    //   console.log('user queue change: ', data);
    //   app.get('current_room').get('djQueue').set(JSON.parse(data));
    //   app.get('current_room').trigger('djQueueChange');
    // }.bind(this));

    return {items: [], text: ''};
  },
  onChange: function(e) {
    this.setState({ text: e.target.value });
  },
  handleSubmit: function(e) {
    e.preventDefault();
    /**
    ************************************************
    MAKE THE VARIABLE NAME EQUAL TO THE CURRENT USER
    ************************************************
    */
    var name = app.get('user').get('display_name');
    if (this.state.text === '') { return; }
    socket.emit('user message', { displayName: name, message: this.state.text });
    var nextItems = this.state.items.concat([ name + ': ' + this.state.text ]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
  },
  componentDidUpdate: function () {
    var container = this.refs.messageContainer.getDOMNode();
    if (container.scrollHeight - (container.scrollTop + container.offsetHeight) >= 50) {
      this.scrolled = true;
    } else {
      this.scrolled = false;
    }
    if (this.scrolled === false) {
      var container = this.refs.messageContainer.getDOMNode();
      container.scrollTop = container.scrollHeight;
    }
  },
  render: function() {
    var style = {
      left: '2.5%',
      width: '95%',
    };
    var divStyle = {
      background: '#222222',
      border: '1px solid #e7e7e7',
      position: 'absolute',
      width: '100%',
      height: '50%',
      bottom: '0'
    };
    var searchBarInputStyle = {
      backgroundColor: '#AAAAAA',
      borderColor: '#EEEEEE',
      position: 'absolute',
      bottom: '0',
      width: '100%'
    };
    var chatListStyle = {
      overflow: 'scroll',
      maxHeight: '88%'
    };
    return (
      <div style={divStyle}>
        <div style={chatListStyle} ref="messageContainer">
          <ChatList items={this.state.items} />
        </div>
        <form style={style} onSubmit={this.handleSubmit}>
          <input style={searchBarInputStyle} onChange={this.onChange} value={this.state.text} className="form-control" placeholder="Say Something..."/>
        </form>
      </div>
    );
  }
});

module.exports = Chat;
