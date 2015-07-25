var LandingPagePopularRooms = React.createClass({
  render: function() {
    return (
      <div className="content-section-a">
          <div className="container">
              <div className="row">
                  <div className="col-lg-4 col-sm-4">
                      <div className="clearfix"></div>
                      <h2 className="section-heading j-center-text">Random Room 1 <br />DJs:</h2>
                      <div className="j-left-25">
                          <img className="img-responsive" src="assets/img/headphones.jpg" alt="" />
                      </div>
                  </div>
                  <div className="col-lg-4 col-sm-4">
                      <div className="clearfix"></div>
                      <h2 className="section-heading j-center-text">Random Room 2<br />DJs:</h2>
                      <div className="j-left-25">
                          <img className="img-responsive" src="assets/img/ipad.png" alt="" />
                      </div>
                  </div>
                  <div className="col-lg-4 col-sm-4">
                      <div className="clearfix"></div>
                      <h2 className="section-heading j-center-text">Random Room 3<br />DJs:</h2>
                      <div className="j-left-25">
                          <img className="img-responsive" src="assets/img/headphones.jpg" alt="" />
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
  }
});