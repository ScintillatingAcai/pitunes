var React = require('react');
var $ = require('jquery');

var PlaylistModel = require('../../../data/models/playlist.js');
var MediasCollection = require('../../../data/collections/medias.js');
var NewPlaylistModal = require('./newPlaylistModal.jsx');
var app = require('../../../roomComponents/loginController.jsx');

var server_uri = 'http://' + document.domain + ':3000',
  socket = io(server_uri);

var placeholder = document.createElement("div");
placeholder.className = "placeholder";

var List = React.createClass({
  getInitialState: function () {
    return { data: this.props.data, text: '' };
  },
  durationToDisplay: function (duration) {
    var minutes = Math.floor(duration / 60) + "";
    if (minutes.length === 1) {
      minutes = "0" + minutes;
    }
    var seconds = duration % 60 + "";
    if (seconds.length === 1) {
      seconds = "0" + seconds;
    }
    return minutes + ":" + seconds;
  },
  handleNewCurrentPlaylist: function () {
    console.log('List fired handleNewCurrentPlaylist');
    var context = this;
    var newData = app.get('user').get('current_playlist').get('medias').map(function (e) {
      // console.log(e)
      return e.get('title') + " | " + context.durationToDisplay(e.get('duration'));
    });
    this.setState({ data: newData });
  },
  componentDidMount: function () {
    this.props.model.on('change:current_playlist', function () {
      console.log('Playlist heard change');
      if (app.get('user').get('current_playlist')) {
        this.handleNewCurrentPlaylist();
      }
    }.bind(this));

    this.props.model.on('newSong', function () {
      console.log('List heard curPL medias change');
      if (app.get('user').get('current_playlist')) {
        this.handleNewCurrentPlaylist();
      }
      this.submitUpdatePlaylist(app.get('user').get('current_playlist'));
    }.bind(this));
  },
  onClick: function (e) {

  },
  onNameChange: function (e) {
    e.preventDefault();
    this.setState({text: e.target.value});
  },
  dragStart: function (e) {
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
    // Firefox requires dataTransfer data to be set
    e.dataTransfer.setData("text/html", e.currentTarget);
  },
  dragEnd: function () {
    this.dragged.style.display = "block";
    this.dragged.parentNode.removeChild(placeholder);
    // Update data
    var data = this.state.data;
    var from = Number(this.dragged.dataset.id);
    var to = Number(this.over.dataset.id);
    if (from < to) to--;
    if (this.nodePlacement === "after") to++;
    data.splice(to, 0, data.splice(from, 1)[0]);
    this.setState({ data: data });
    this.submitUpdatePlaylist(app.get('user').get('current_playlist'));
  },
  dragOver: function (e) {
    e.preventDefault();
    this.dragged.style.display = "none";
    if (e.target.className === "placeholder") return;
    this.over = e.target;
    var relY = e.clientY - this.over.offsetTop;
    var height = this.over.offsetHeight / 2;
    var parent = e.target.parentNode;
    if (relY > height) {
      this.nodePlacement = "after";
      parent.insertBefore(placeholder, e.target.nextElementSibling);
    } else if (relY < height) {
      this.nodePlacement = "before";
      parent.insertBefore(placeholder, e.target);
    }
  },
  createNewPlaylist: function () {
    // TODO fix placeholder, make modal (possibly?) for naming playlist
    console.log('name: ', this.state.text);
    var newPlaylist = new PlaylistModel({name: this.state.text, medias: new MediasCollection()});
    this.submitNewPlaylist(newPlaylist);
  },
  submitNewPlaylist: function (playlist) {
    var jsonPlaylist = playlist.toJSON();
    if (app.get('user').get('id') !== 0) {
      var context = this;
      $.ajax({url: server_uri + '/api/users/' + app.get('user').get('id') + '/playlists',
        type: 'POST',
        dataType: 'json',
        data: jsonPlaylist,
        success: function (res) {
          console.log('id: ', res.id);
          console.log(res);
          app.get('user').set('current_playlist_id', res.id);
          playlist.set('id', res.id);
          app.get('user').set('current_playlist', playlist);
        },
        error: function (res) {
          console.log("error: " + res.statusText);
        }
      });
    } else {
      console.log('not logged in');
    }
  },
  submitUpdatePlaylist: function (playlist) {
    var jsonPlaylist = playlist.toJSON();
    delete jsonPlaylist.current_media_index;
    // if (!jsonPlaylist.current_media_index && jsonPlaylist.medias.length > 0) {
    //   console.log('heard 0 media index with medias');
    //   jsonPlaylist.current_media_index = 1;
    // }
    console.log('playlist: ', jsonPlaylist);
    var context = this;
    if (app.get('user').get('id') !== 0) {
      $.ajax({url: server_uri + '/api/users/' + app.get('user').get('id') + '/playlists/' + app.get('user').get('current_playlist_id'),
        type: 'PUT',
        dataType: 'json',
        data: jsonPlaylist,
        success: function (res) {
          console.log('submitted updated playlist');
        },
        error: function (res) {
          console.log("error: " + res.statusText);
        }
      });
    } else {
      console.log('not logged in');
    }
  },
  render: function () {
    var style = {
      cursor: 'pointer',
      padding: '0',
      margin: '0 0 5px 10px',
      color: '#FFFFFF',
      fontSize: '12px',
      listStyleType: 'none'
    };
    var listItems = this.state.data.map((function (item, i) {
      return (
        <div style={style} data-id={i}
          key={i}
          draggable="true"
          onDragEnd={this.dragEnd}
          onDragStart={this.dragStart}
          onClick={this.onClick}>
          {i + 1}. {item}
        </div>

      );
    }).bind(this));
    var nameInputStyle = {
      backgroundColor: '#AAAAAA',
      borderColor: '#EEEEEE',
      width: '100px',
      margin: '0 0 0 5px'
    };
    return (
      <div>
        <div onDragOver={this.dragOver}>{listItems}</div>
      </div>
    );
  }
});

var Songs = React.createClass({
  render: function() {
    return (
      <List model={app.get('user')} data={[]} />
    );
  }
});

var PlaylistTitle = React.createClass({
  getInitialState: function() {
    return {title: this.props.title}
  },
  componentDidMount: function() {
    this.props.model.on('change:current_playlist', function () {
      console.log('playlistTitle heard change in user\'s current_playlist');
      if (app.get('user').get('current_playlist')) {
        this.handleNewCurrentPlaylist();
        console.log("!!!!!!!!")
        $('.playlistNavigateButtonLeft').removeClass('hidden');
        $('.playlistNavigateButtonRight').removeClass('hidden');
        $('.playlistNavigateMenuDropdown').removeClass('hidden');
        $('.playlistTitleContainer').removeClass('text-center');
        $('.playlistTitleContainer').addClass('text-left');
      }
    }.bind(this));

  },
  handleNewCurrentPlaylist: function() {
    // console.log(app.get('user').get('current_playlist').get('attributes'));
    if (app.get('user').get('current_playlist').get('name')) {
      this.setState({ title: app.get('user').get('current_playlist').get('name') });
    } else {
      this.setState({ title: 'No Playlist Title' });
    }
  },
  render: function(){
    var style = {
      color: 'white',
      borderBottom: '2px solid #FFF',
      minHeight: '30px'
    };
    var dropdownStyle = {  
      marginTop: '-8px'
    };
    var buttonStyle = {
      margin: '0 5px 0 5px'
    }
    return (
      <div>
      <h4 className='playlistTitleContainer text-center' style={style}>
        <button className='btn btn-xs playlistNavigateButtonLeft hidden' style={buttonStyle}>
          <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
        </button>
        {this.state.title}
        <button className='btn btn-xs playlistNavigateButtonRight hidden' style={buttonStyle}>
          <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
        </button>
        <div style={dropdownStyle} className="playlistNavigateMenuDropdown btn-group pull-right hidden">
          <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="glyphicon glyphicon-list" aria-hidden="true"></span>
          </button>
          <ul className="dropdown-menu dropdown-menu-right">
            <li><a href="#" onClick={this.props.newPlaylistClick}>New Playlist</a></li>
            <li><a href="#">Rename Playlist</a></li>
            <li><a href="#">Delete Playlist</a></li>
          </ul>
        </div>
      </h4>
      </div>
    );
  }
});

var Playlist = React.createClass({
  getInitialState: function () {
    return { showNewPlaylist: false};
  },
  close: function() {
    console.log('closed newPlaylist');
    this.setState({ showNewPlaylist: false});
  },
  newPlaylistClick: function () {
    this.setState({ showNewPlaylist: true});
  },
  createNewPlaylist: function () {
    var form = document.getElementById('newPlaylist-form');
    console.log('newPlaylist name: ', form[0].value);
    var newPlaylist = new PlaylistModel({name: form[0].value, medias: new MediasCollection()});
    this.submitNewPlaylist(newPlaylist);
  },
  submitNewPlaylist: function (playlist) {
    var jsonPlaylist = playlist.toJSON();
    if (app.get('user').get('id') !== 0) {
      var context = this;
      $.ajax({url: server_uri + '/api/users/' + app.get('user').get('id') + '/playlists',
        type: 'POST',
        dataType: 'json',
        data: jsonPlaylist,
        success: function (res) {
          console.log('id: ', res.id);
          console.log(res);
          app.get('user').set('current_playlist_id', res.id);
          playlist.set('id', res.id);
          app.get('user').set('current_playlist', playlist);
          context.close();
        },
        error: function (res) {
          console.log("error: " + res.statusText);
        }
      });
    } else {
      console.log('not logged in');
    }
  },
  render: function() {
    var style = {
      background: '#222222',
      border: '1px solid #e7e7e7',
      position: 'absolute',
      width: '100%',
      height: '50%',
      overflow: 'auto',
      textAlign: 'left',
      bottom: '0'
    };
    return (
      <div id="playlistContainer" style={style}>
        <NewPlaylistModal close={this.close} createNewPlaylist={this.createNewPlaylist} showNewPlaylist={this.state.showNewPlaylist}/>
        <PlaylistTitle newPlaylistClick={this.newPlaylistClick} model={app.get('user')} title={'Sign in to create a Playlist!'}/>
        <Songs />
      </div>
    );
  }
});

module.exports = Playlist;