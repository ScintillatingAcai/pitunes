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
  componentDidMount: function () {
    var context = this;
    this.props.model.on('change', function () {
      console.log(this.props.model.get('djQueue').models);
      console.log('QUEUE LIST HEARD CHANGE');
        context.handleRoomChange();
    }.bind(this));

    this.props.model.on('djQueueChange', function () {
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
        <QueueList model={app.get('current_room')} />
      </div>
    );
  }
});