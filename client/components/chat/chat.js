var Messages = React.createClass({
  render: function() {
    var style = {
      background: '#222222',
      border: '2px solid #444444',
      position: 'absolute', 
      width: '100%',
      height: '50%',
      overflow: 'auto',
      resize: 'vertical',
      bottom: '10%',
      color: 'blue'
    };
    return (
      <div>
        Hello I am a message!!!
      </div>
    );
  }
});

var SubmitForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    /** 
    ************************************************
    MAKE THE VARIABLE NAME EQUAL TO THE CURRENT USER
    ************************************************
    */
    var name = 'Josh';
    var message = React.findDOMNode(this.refs.message).value.trim();
    console.log('message is ' + message);
    if (!message) return;
    
    React.findDOMNode(this.refs.message).value = '';
  },
  render: function() {
    var style = {
      left: '2.5%',
      width: '95%',
      bottom: '5%',
      position: 'absolute'
    };
    var SearchBarInputStyle = {
      backgroundColor: '#AAAAAA',
      borderColor: '#EEEEEE'
    };
    return (
       <form style={style}>
         <input style={SearchBarInputStyle} type="text" className="form-control" placeholder="Say Something..." ref="message" />
         <input onClick={this.handleSubmit} type="submit" hidden/>
       </form>
    );
  }
});

var Chat = React.createClass({
  render: function() {
    var style = {
      background: '#222222',
      border: '2px solid #444444',
      position: 'absolute', 
      width: '100%',
      height: '50%',
      overflow: 'auto',
      resize: 'vertical',
      bottom: '0'
    };
    return (
      <div style={style}>
        <Messages />
        <SubmitForm />
      </div>
    );
  }
});