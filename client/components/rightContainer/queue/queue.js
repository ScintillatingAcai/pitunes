var dummyQueue = {
  0: 'John',
  1: 'Zach',
  2: 'Terry',
  3: 'Justin',
  4: 'Mark',
  5: 'Daniel',
  6: 'Nathan', 
  7: 'Kyle',
  8: 'Josh'
};

var arrQueue = [];
for (var key in dummyQueue) {
  arrQueue.push(dummyQueue[key]);
}

var QueueList = React.createClass({
  render: function() {
    var style = {
      cursor: 'pointer',
      marginBottom: '5px',
      padding: '0',
      margin: '0',
      color: 'grey',
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
      color: 'grey'
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