var React = require('react');
var $ = require('jquery');

var server_uri = 'http://' + document.domain + ':3000',
socket = io(server_uri);

var StatusBar = React.createClass({
  getInitialState: function () {
    return {currentDJ: this.props.currentDJ, videoTitle: this.props.videoTitle};
  },
  componentDidMount: function () {
    var context = this;
    socket.on('room status', function (data) {
      if (data.currentDJ === null) {
        context.setState({currentDJ: null});
      } else if (data.currentMedia) {
        context.setState({currentDJ: 'Futballguy'});
        context.setState({videoTitle: data.currentMedia.title});
      }
    });

  },
  heardMediaStatus: function () {

  },
  headRoomStatus: function () {

  },
  generateStatusMessage: function () {
    var djStyle = {
      color: '#0000FF'
    };
    var songStyle = {
      color: '#FF0000'
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
      borderBottom: '2px solid #e7e7e7',
      overflow: 'scroll'
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