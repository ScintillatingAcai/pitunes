var React = require('react');
var $ = require('jquery');

var PlaylistModel = require('../../../data/models/playlist.js');
var MediasCollection = require('../../../data/collections/medias.js');
var NewPlaylistModal = require('./newPlaylistModal.jsx');
var RenamePlaylistModal = require('./renamePlaylistModal.jsx');
var DeletePlaylistModal = require('./deletePlaylistModal.jsx');
var ReactBootstrap = require('react-bootstrap');
var Bootstrap = require('bootstrap');

var ButtonGroup = ReactBootstrap.ButtonGroup;
var Button = ReactBootstrap.Button;
var MenuItem = ReactBootstrap.MenuItem;
var DropdownButton = ReactBootstrap.DropdownButton;
var Glyphicon = ReactBootstrap.Glyphicon;

var server_uri = window.location.origin;
var placeholder = document.createElement("div");
placeholder.className = "placeholder";

var List = React.createClass({
  getInitialState: function () {
    return { data: this.props.data, text: '' };
  },
  componentDidMount: function () {
    this.props.model.on('change:current_playlist', function () {
      if (this.props.app.get('user').get('current_playlist')) {
        this.handleNewCurrentPlaylist();
      }
    }.bind(this));

    this.props.model.on('newSong', function () {
      this.submitUpdatePlaylist(this.props.app.get('user').get('current_playlist'));
    }.bind(this));

    if (this.props.app.get('user').get('current_playlist')) {
      this.handleNewCurrentPlaylist();
    }

    this.props.app.on('userSignInOut', this.updateForSignInStatus);
    this.updateForSignInStatus();
  },
  componentWillUnmount: function () {
    this.props.model.off('change:current_playlist');
    this.props.model.off('newSong');
    this.props.app.off('userSignInOut');
  },
  updateForSignInStatus: function () {
    // if (this.props.app.isSignedIn()) {
    this.props.app.get('user').updateForUserStatus();
    // }
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
    var context = this;
    var newData = [];
    var mediaLength = this.props.app.get('user').get('current_playlist').get('medias').length;
    var current_media_index = this.props.app.get('user').get('current_playlist').get('current_media_index');
    var next_media_index = (current_media_index) % mediaLength + 1;
    this.props.app.get('user').get('current_playlist').get('medias').each(function (e, index) {
      var mediaIndex =  (index + mediaLength - next_media_index + 1) % mediaLength;
      var mediaObject = {};
      mediaObject.title = e.get('title');
      mediaObject.duration = context.durationToDisplay(e.get('duration'));
      mediaObject.id = e.get('id');
      newData[mediaIndex] = mediaObject;
    });
    this.setState({ data: newData });
  },
  removeSong: function (e) {
    var data = this.state.data;
    var songId = $(e.target).closest('div').attr('data-id');
    data.splice(songId, 1);
    this.setState({data: data});
    var newMedias = new MediasCollection();
    for (var i = 0; i < this.state.data.length; i++) {
      var aData = this.state.data[i];
      var aDataID = aData.id;
      var aMedia = this.props.app.get('user').get('current_playlist').get('medias').get(aDataID);
      newMedias.push(aMedia);
    }
    this.props.app.get('user').get('current_playlist').set('medias', newMedias);
    this.props.app.get('user').get('current_playlist').set('current_media_index', 0);
    this.submitUpdatePlaylist(this.props.app.get('user').get('current_playlist'));
  },
  onNameChange: function (e) {
    e.preventDefault();
    this.setState({ text: e.target.value });
  },
  dragStart: function (e) {
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
    // Firefox requires dataTransfer data to be set
    e.dataTransfer.setData("text/html", e.currentTarget);
  },
  dragEnd: function () {
    this.dragged.style.display = "block";
    this.over.parentNode.removeChild(placeholder);
    // Update data
    var data = this.state.data;
    var from = Number(this.dragged.dataset.id);
    var to = Number(this.over.dataset.id);
    if (from < to) to--;
    if (this.nodePlacement === "after") to++;
    data.splice(to, 0, data.splice(from, 1)[0]);
    this.setState({ data: data });
    var newMedias = new MediasCollection();
    for (var i = 0; i < this.state.data.length; i++) {
      var aData = this.state.data[i];
      var aDataID = aData.id;
      var aMedia = this.props.app.get('user').get('current_playlist').get('medias').get(aDataID);
      newMedias.push(aMedia);
    }
    this.props.app.get('user').get('current_playlist').set('medias', newMedias);
    this.props.app.get('user').get('current_playlist').set('current_media_index', 0);
    this.submitUpdatePlaylist(this.props.app.get('user').get('current_playlist'));
  },
  dragOver: function (e) {
    e.preventDefault();
    this.dragged.style.display = "none";
    if (e.target.className === "placeholder") return;
    this.over = e.target;
    var relY = e.clientY - this.over.offsetTop;
    var height = this.over.parentElement.offsetHeight / 2;
    var parent = e.target.parentNode;
    if (relY > height) {
      this.nodePlacement = "before";
      parent.insertBefore(placeholder, e.target.nextElementSibling);
    } else if (relY < height) {
      this.nodePlacement = "before";
      parent.insertBefore(placeholder, e.target);
    }
  },
  createNewPlaylist: function () {
    var newPlaylist = new PlaylistModel({name: this.state.text, medias: new MediasCollection()});
    this.submitNewPlaylist(newPlaylist);
  },
  submitNewPlaylist: function (playlist) {
    var jsonPlaylist = playlist.toJSON();
    if (this.props.app.get('user').get('id') !== 0) {
      var context = this;
      $.ajax({url: server_uri + '/api/users/' + this.props.app.get('user').get('id') + '/playlists',
        type: 'POST',
        dataType: 'json',
        data: jsonPlaylist,
        success: function (res) {
          context.props.app.get('user').set('current_playlist_id', res.id);
          playlist.set('id', res.id);
          context.props.app.get('user').set('current_playlist', playlist);
        },
        error: function (res) {
          console.log("error: " + res.statusText);
        }
      });
    }
  },
  submitUpdatePlaylist: function (playlist) {
    var jsonPlaylist = playlist.toJSON();
    var context = this;
    if (this.props.app.get('user').get('id') !== 0) {
      $.ajax({url: server_uri + '/api/users/' + this.props.app.get('user').get('id') + '/playlists/' + this.props.app.get('user').get('current_playlist_id'),
        type: 'PUT',
        dataType: 'json',
        data: jsonPlaylist,
        success: function (res) {
          context.handleNewCurrentPlaylist();
          console.log('sucesfful update')
          $("body").css("cursor", "default");
        },
        error: function (res) {
          console.log("error: " + res.statusText);
          $("body").css("cursor", "default");
        }
      });
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
    var cellStyle = {
      width: '80%',
      margin: '0 5px 0 5px'
    };
    var listItems = this.state.data.map((function (item, i) {
      return (
        <div style={style}
          data-id={i}
          key={i}
          draggable="true"
          onDragEnd={this.dragEnd}
          onDragStart={this.dragStart}
          onClick={this.onClick}>
          <span>{i + 1}. </span><span>{item.title}</span><span> | {item.duration} </span><button className='btn btn-xs' onClick={this.removeSong}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
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
      <div onDragOver={this.dragOver}>{listItems}</div>
    );
  }
});

var Songs = React.createClass({
  render: function() {
    return (
      <List model={this.props.app.get('user')} data={[]} app={this.props.app}/>
    );
  }
});

var PlaylistTitle = React.createClass({
  getInitialState: function () {
    return {title: '', playlistData: []}
  },
  componentDidMount: function () {

    this.props.model.on('change:current_playlist', function () {
      if (this.props.app.get('user').get('current_playlist')) {
        this.getUsersPlaylists();
        $('.playlistSelectDropdown').removeClass('hidden');
        $('.playlistNavigateMenuDropdown').removeClass('hidden');
      }
    }.bind(this));

    this.props.model.on('currentPlaylistNewName', function () {
      if (this.props.app.get('user').get('current_playlist')) {
        this.getUsersPlaylists();
        $('.playlistSelectDropdown').removeClass('hidden');
        $('.playlistNavigateMenuDropdown').removeClass('hidden');
      }
    }.bind(this));

    if (this.props.app.get('user').get('current_playlist')) {
      this.getUsersPlaylists();
      $('.playlistSelectDropdown').removeClass('hidden');
      $('.playlistNavigateMenuDropdown').removeClass('hidden');
    }

    this.props.app.on('userSignInOut', this.updateForSignInStatus);
    this.updateForSignInStatus();
  },
  componentWillUnmount: function () {
    this.props.model.off('change:current_playlist');
    this.props.model.off('currentPlaylistNewName');
    this.props.app.off('userSignInOut');
  },
  updateForSignInStatus: function () {
    if (this.props.app.isSignedIn()) {
      $('.playlistSelectDropdown').removeClass('hidden');
      $('.playlistNavigateMenuDropdown').removeClass('hidden');
    } else {
      this.setState({title: 'Sign in to create a Playlist!'});
      $('.playlistSelectDropdown').addClass('hidden');
      $('.playlistNavigateMenuDropdown').addClass('hidden');
    }
  },
  getUsersPlaylists: function () {
    var context = this;
    if (this.props.app.get('user').get('id') !== 0) {
      $.ajax({url: server_uri + '/api/users/' + this.props.app.get('user').get('id') + '/playlists/',
        type: 'GET',
        success: function (res) {
          var playlistNames = res.map(function(e) {
            return {id: e.id, text: e.name};
          });
          context.setState({ playlistData: playlistNames })
          context.handleNewCurrentPlaylist();
        },
        error: function (res) {
          console.log("error: " + res.statusText);
        }
      });
    }
  },
  handleNewCurrentPlaylist: function () {
    if (!this.props.app.get('user').get('current_playlist')) {
      this.setState({ title: 'No Playlist' });
    } else if (!this.props.app.get('user').get('current_playlist').get('name')) {
      this.setState({ title: 'No Playlist Title' });
    } else {
      this.setState({ title: this.props.app.get('user').get('current_playlist').get('name') });
    }
  },
  swapPlaylist: function (e) {
    var newPlaylistId = e.target.parentNode.getAttribute('data-playlistid')
    var context = this;
    if (this.props.app.get('user').get('id') !== 0) {
      $.ajax({url: 'api/users/' + this.props.app.get('user').get('id') + '/playlists/' + newPlaylistId + '/current',
        type: 'PUT',
        success: function (res) {
          console.log('new playlist id:', newPlaylistId);
          context.props.app.get('user').set('current_playlist_id', newPlaylistId);
          context.props.app.get('user').set('current_playlist', context.props.app.get('user').get('playlists').get(newPlaylistId));
        },
        error: function (res) {
          console.log("error: " + res.statusText);
        }
      });
    }
  },
  render: function (){
    var style = {
      color: 'white',
      minHeight: '30px',
      fontSize: '20px'
    };
    var dropdownStyle = {
      paddingRight: '10px'
    };
    var buttonStyle = {
      margin: '0 5px 0 5px'
    };
    var leftButtonStyle = {
      paddingLeft: '6px'
    };
    var playlistItems = this.state.playlistData.map((function (item, i) {
      return (
        <MenuItem data-id={i} key={i} data-playlistid={item.id} onClick={this.swapPlaylist}>
          {item.text}
        </MenuItem>
      );
    }).bind(this));
    return (
      <div style={leftButtonStyle}>
      <h3 className='playlistTitleContainer text-center' style={style}>
        <div style={dropdownStyle} className="playlistSelectDropdown btn-group pull-left hidden">
          <ButtonGroup>
            <DropdownButton bsSize='xsmall'>
              {playlistItems}
            </DropdownButton>
          </ButtonGroup>
        </div>
        {this.state.title}
        <div style={dropdownStyle} className="playlistNavigateMenuDropdown btn-group pull-right hidden">
          <button type="button" className="btn btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="glyphicon glyphicon-list" aria-hidden="true"></span>
          </button>
          <ul className="dropdown-menu dropdown-menu-right">
            <li><a onClick={this.props.newPlaylistClick}>New Playlist</a></li>
            <li><a onClick={this.props.renamePlaylistClick}>Rename Playlist</a></li>
            <li><a onClick={this.props.deletePlaylistClick}>Delete Playlist</a></li>
          </ul>
        </div>
      </h3>
      </div>
    );
  }
});

var Playlist = React.createClass({
  getInitialState: function () {
    return { showNewPlaylist: false, showRenamePlaylist: false, showDeletePlaylist: false};
  },
  close: function () {
    this.setState({ showNewPlaylist: false, showRenamePlaylist: false, showDeletePlaylist: false});
  },
  newPlaylistClick: function () {
    this.setState({ showNewPlaylist: true });
  },
  renamePlaylistClick: function () {
    this.setState({ showRenamePlaylist: true });
  },
  deletePlaylistClick: function () {
    this.setState({ showDeletePlaylist: true });
  },
  createNewPlaylist: function () {
    var form = document.getElementById('newPlaylist-form');
    var newPlaylist = new PlaylistModel({name: form[0].value, medias: new MediasCollection()});
    this.submitNewPlaylist(newPlaylist);
  },
  submitNewPlaylist: function (playlist) {
    var jsonPlaylist = playlist.toJSON();
    if (this.props.app.get('user').get('id') !== 0) {
      var context = this;
      $.ajax({url: server_uri + '/api/users/' + this.props.app.get('user').get('id') + '/playlists',
        type: 'POST',
        dataType: 'json',
        data: jsonPlaylist,
        success: function (res) {
          context.props.app.get('user').set('current_playlist_id', res.id);
          playlist.set('id', res.id);
          context.props.app.get('user').updateForUserStatus();
          context.close();
        },
        error: function (res) {
          console.log("error: " + res.statusText);
        }
      });
    }
  },
  submitUpdatePlaylist: function () {
    var playlist = this.props.app.get('user').get('current_playlist')
    var form = document.getElementById('renamePlaylist-form');
    var jsonPlaylist = playlist.toJSON();
    delete jsonPlaylist.current_media_index;
    jsonPlaylist.name = form[0].value;
    var context = this;
    if (this.props.app.get('user').get('id') !== 0) {
      $.ajax({url: server_uri + '/api/users/' + this.props.app.get('user').get('id') + '/playlists/' + this.props.app.get('user').get('current_playlist_id'),
        type: 'PUT',
        dataType: 'json',
        data: jsonPlaylist,
        success: function (res) {
          context.props.app.get('user').get('current_playlist').set('name', res.name);
          context.props.app.get('user').trigger('currentPlaylistNewName');
          context.close();
        },
        error: function (res) {
          console.log("error: " + res.statusText);
        }
      });
    }
  },
  deleteCurrentPlaylist: function () {
    var context = this;
    if (this.props.app.get('user').get('id') !== 0) {
      $.ajax({url: server_uri + '/api/users/' + this.props.app.get('user').get('id') + '/playlists/' + this.props.app.get('user').get('current_playlist_id'),
        type: 'DELETE',
        success: function (res) {
          var newPlaylistId = res.current_playlist_id;
          console.log('new playlist id: ', newPlaylistId);
          context.props.app.get('user').set('current_playlist_id', newPlaylistId);
          context.props.app.get('user').updateForUserStatus();
          context.close();
        },
        error: function (res) {
          console.log("error: " + res.statusText);
        }
      });
    }
  },
  preventSubmit: function(e) {
    e.preventDefault();
  },
  render: function () {
    var style = {
      position: 'absolute',
      width: '100%',
      height: '50%',
      overflow: 'auto',
      textAlign: 'left',
      bottom: '0',
      background: '#444444',
      border: '10px solid #222222',
      borderRadius: '40px'
    };
    return (
      <div id="playlistContainer" style={style}>
        <DeletePlaylistModal close={this.close} deleteCurrentPlaylist={this.deleteCurrentPlaylist} showDeletePlaylist={this.state.showDeletePlaylist} app={this.props.app}/>
        <NewPlaylistModal close={this.close} createNewPlaylist={this.createNewPlaylist} showNewPlaylist={this.state.showNewPlaylist} preventSubmit={this.preventSubmit} app={this.props.app}/>
        <RenamePlaylistModal close={this.close} submitUpdatePlaylist={this.submitUpdatePlaylist} showRenamePlaylist={this.state.showRenamePlaylist} preventSubmit={this.preventSubmit} app={this.props.app}/>
        <PlaylistTitle renamePlaylistClick={this.renamePlaylistClick} newPlaylistClick={this.newPlaylistClick} deletePlaylistClick={this.deletePlaylistClick} model={this.props.app.get('user')} data={[]} app={this.props.app}/>
        <Songs app={this.props.app}/>
      </div>
    );
  }
});

module.exports = Playlist;
