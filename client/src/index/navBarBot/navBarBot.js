var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;

var NavBarBotStyle = {
  position: "absolute",
  bottom: "0",
  left: "0",
  width: '100%',
  margin: '0px 0px 0px 0px',
  backgroundColor: '#222222',
  border: '2px solid #444444',
  borderRadius: '2px',
  display: 'inline',
  height: '4%',
  color: '#888',
  textAlign: 'center'
};

var NavBarBot = React.createClass({
  render: function() {
    return (
      <div style={NavBarBotStyle}><p>Built for Hack Reactor by Scintillating Acai, HR28, July 2015</p></div>
    );
  }
});

// var NavBarBot = React.createClass({
//   render: function() {
//     return (
//       <footer>
//         <div className="container">
//           <div className="row">
//             <div className="col-lg-12 j-center-text">
//               <ul className="list-inline">
//                 <li>
//                   <a href="#home">Home</a>
//                 </li>
//                 <li className="footer-menu-divider">&sdot;</li>
//                 <li>
//                   <a href="#home">About</a>
//                 </li>
//               </ul>
//               <p className="copyright text-muted small">Copyright &copy; 2015, Scintillating Açaí, All Rights Reserved</p>
//             </div>
//           </div>
//         </div>
//       </footer>
//     );
//   }
// });