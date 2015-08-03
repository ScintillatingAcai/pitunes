var React = require('react');

var StatusBar = React.createClass({
  getInitialState: function () {
    return {currentDJ: this.props.currentDJ, videoTitle: this.props.videoTitle};
  },
  componentDidMount: function () {
    var context = this;
    socket.on('room status', function (data) {
      var newRoomStatus = data;
      context.heardRoomStatus(newRoomStatus);
    });
  },
  heardRoomStatus: function (data) {
    if (data.currentDJ === null) {
      this.setState({currentDJ: null});
    } else if (data.currentMedia) {
      var dj = this.props.app.get('current_room').get('currentDJ').get('display_name');
      this.setState({currentDJ: dj});
      this.setState({videoTitle: data.currentMedia.title});
    }
  },
  generateStatusMessage: function () {
    var djStyle = {
      color: '#99DDFF'
    };
    var songStyle = {
      color: '#FF8C00'
    };
    if (this.state.currentDJ === null) {
      return 'No Song Currently Playing';
    } else {
      return (<div><span style={djStyle}>{this.state.currentDJ}</span><span> is playing </span><span style={songStyle}>{this.state.videoTitle}</span></div>);
    }
  },
  render: function () {
    var style = {
      color: 'white',
      minHeight: '30px',
      maxHeight: '30px',
      overflow: 'hidden'
    };
    return (
      <div>
        <h4 className='statusbarContainer text-center' style={style}>
          {this.generateStatusMessage()}
        </h4>
      </div>
    );
  }
});

module.exports = StatusBar;
