
var ChatList = React.createClass({
  render: function() {
    var style = {
      marginTop: '5%',
      color: 'grey',
      listStyleType: 'none',
      maxHeight: '200px'
    };
    var createItem = function(itemText, index) {
      return <li key={index + itemText}>{itemText}</li>;
    };
    return <ul style={style}>{this.props.items.map(createItem)}</ul>;
  }
});

var Chat = React.createClass({
  getInitialState: function() {
    return {items: [], text: ''};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    /** 
    ************************************************
    MAKE THE VARIABLE NAME EQUAL TO THE CURRENT USER
    ************************************************
    */
    var name = "Josh";
    if (this.state.text === '') { return; }
    var nextItems = this.state.items.concat([name + ': ' + this.state.text]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
    var container = this.refs.messageContainer.getDOMNode();

    if (container.scrollHeight - (container.scrollTop + container.offsetHeight) >= 50) {
      this.scrolled = true;
    } else {
      this.scrolled = false;
    }
    if (!this.scrolled) { container.scrollTop = container.scrollHeight - 10; }
  },
  render: function() {
    var style = {
      left: '2.5%',
      width: '95%',
    };
    var divStyle = {
      background: '#222222',
      border: '2px solid #444444',
      position: 'absolute', 
      width: '100%',
      height: '50%',
      bottom: '0'
    };
    var searchBarInputStyle = {
      backgroundColor: '#AAAAAA',
      borderColor: '#EEEEEE',
      position: 'fixed',
      bottom: '5%',
      width: '49%'
    };
    var chatListStyle = {
      bottom: '12%',
      overflow: 'scroll'
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