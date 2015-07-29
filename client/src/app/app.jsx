var React = require('react');

var AppModel = require('../data/models/app.js');
var LeftContainer = require('../index/leftContainer/leftContainer.jsx');
var CenterContainer = require('../index/centerContainer/centerContainer.jsx');
var RightContainer = require('../index/rightContainer/rightContainer.jsx');
// var app = require('../roomComponents/loginController.jsx');

var AppContainer = React.createClass({
  render: function () {
    var style = {
      WebkitTouchCallout: 'none',
      WebkitUserSelect: 'none',
      KhtmlUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none',
      userSelect: 'none'
    };
    return (
      <div style={style}>
        <LeftContainer app={this.props.app}/>
        <CenterContainer app={this.props.app}/>
        <RightContainer app={this.props.app}/>
      </div>
    );
  }
});

module.exports = AppContainer;
