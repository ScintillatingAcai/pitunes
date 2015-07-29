var React = require('react');

var StatusBar = React.createClass({
  getInitialState: function () {
    return {dj: this.props.dj, title: this.props.title};
  },
  componentDidMount: function () {

  },
  generateStatusMessage: function () {
    if (this.state.dj === 'None') {
      return 'No Song Currently Playing';
    } else {
      return this.state.dj + ' is playing ' + this.state.title;
    }
  },
  render: function () {
    var style = {
      color: 'white',
      minHeight: '30px',
      borderBottom: '2px solid #e7e7e7'
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
