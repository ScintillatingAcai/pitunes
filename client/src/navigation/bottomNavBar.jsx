var React = require('react');

var BottomNavBar = React.createClass({
  render: function () {
    return (
        <div className="container darkgrey-background j-footer-bot">
            <div className="col-lg-12 j-center-text">
              <p className="copyright text-muted small j-color-white z-margin-five">Copyright &copy; 2015, Scintillating Açaí, All Rights Reserved</p>
            </div>
        </div>
    );
  }
});

module.exports = BottomNavBar;
