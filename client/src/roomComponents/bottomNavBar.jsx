var React = require('react');

var BottomNavBar = React.createClass({
  render: function() {
    return (
      <footer>
        <div className="container j-footer-bot">
          <div className="row">
            <div className="col-lg-12 j-center-text">
              <ul className="list-inline">
                <li>
                  <a href="landingPage.html">Home</a>
                </li>
                <li className="footer-menu-divider">&sdot;</li>
                <li>
                  <a href="">About</a>
                </li>
              </ul>
              <p className="copyright text-muted small">Copyright &copy; 2015, Scintillating Açaí, All Rights Reserved</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
});

module.exports = BottomNavBar;