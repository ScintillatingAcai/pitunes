var React = require('react');

var StatusBar = React.createClass({
  getInitialState: function () {
    return {currentDJ: this.props.currentDJ, videoTitle: this.props.videoTitle};
  },
  componentDidMount: function () {
    var context = this;
    this.props.app.on('room status', function () {
      context.handleRoomChange();
    }.bind(this));
  },
  componentWillUnmount: function() {
    this.props.app.off('room status');
  },
  handleRoomChange: function (data) {
    var dj = this.props.app.get('current_room').get('currentDJ');
    var currentMedia = this.props.app.get('current_room').get('currentMedia');

    if (!dj.get('id')) {
      this.setState({currentDJ: null});
    } else {

      this.setState({currentDJ: dj.get('display_name')});
      this.setState({videoTitle: currentMedia.get('title')});
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
