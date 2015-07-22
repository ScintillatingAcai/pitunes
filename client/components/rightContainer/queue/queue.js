var room = {
  queue: {
    0: 'John',
    1: 'Zach',
    2: 'Kyle',
    3: 'Josh'
  }
};


var arrQueue = [];
for (var key in room.queue) {
  arrQueue.push(room.queue[key]);
}

var QueueList = React.createClass({
  render: function() {
    var style = {
      cursor: 'pointer',
      marginBottom: '5px',
      padding: '0',
      margin: '0',
      color: '#FFFFFF',
      listStyleType: 'none'
    }
    var listItems = arrQueue.map((function(item, i) {
      return (
        <li style={style} data-id={i} key={i}>
          {item}
        </li>
      );
    }).bind(this));
    return (
      <ul >{listItems}</ul>
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

var Queue = React.createClass({
  render: function() {
    var style = {
      background: '#222222',
      border: '2px solid #444444',
      position: 'absolute', 
      width: '100%',
      height: '50%',
      overflow: 'auto'
    };
    return (
      <div style={style}>
        <QueueTitle />
        <QueueList />
      </div>
    );
  }
});