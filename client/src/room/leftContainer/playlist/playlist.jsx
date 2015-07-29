var React = require('react');
var $ = require('jquery');

var PlaylistModel = require('../../../data/models/playlist.js');
var MediasCollection = require('../../../data/collections/medias.js');
var NewPlaylistModal = require('./newPlaylistModal.jsx');
var RenamePlaylistModal = require('./renamePlaylistModal.jsx');
var DeletePlaylistModal = require('./deletePlaylistModal.jsx');

var server_uri = window.location.origin;
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
    var context = this;
    var newData = [];
    var mediaLength = this.props.app.get('user').get('current_playlist').get('medias').length;
    var current_media_index = this.props.app.get('user').get('current_playlist').get('current_media_index');
    var next_media_index = (current_media_index) % mediaLength + 1;
    console.log('medias length: ', mediaLength);
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
  componentDidMount: function () {
    this.props.model.on('change:current_playlist', function () {
      if (this.props.app.get('user').get('current_playlist')) {
        this.handleNewCurrentPlaylist();
      }
    }.bind(this));

    this.props.model.on('newSong', function () {
      console.log('List heard curPL medias change');
      if (this.props.app.get('user').get('current_playlist')) {
        this.handleNewCurrentPlaylist();
      }
      this.submitUpdatePlaylist(this.props.app.get('user').get('current_playlist'));
    }.bind(this));

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
          console.log('id: ', res.id);
          console.log(res);
          context.props.app.get('user').set('current_playlist_id', res.id);
          playlist.set('id', res.id);
          context.props.app.get('user').set('current_playlist', playlist);
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
    var context = this;
    if (this.props.app.get('user').get('id') !== 0) {
      $.ajax({url: server_uri + '/api/users/' + this.props.app.get('user').get('id') + '/playlists/' + this.props.app.get('user').get('current_playlist_id'),
        type: 'PUT',
        dataType: 'json',
        data: jsonPlaylist,
        success: function (res) {
          console.log('Submitted updated playlist');
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
    var cellStyle = {
      width: '80%',
      margin: '0 5px 0 5px'
    };
    console.log(this.state.data);
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
    return {title: this.props.title, playlistData: []}
  },
  componentDidMount: function () {
    this.props.model.on('change:current_playlist', function () {
      console.log('playlistTitle heard change in user\'s current_playlist');
      if (this.props.app.get('user').get('current_playlist')) {
        this.getUsersPlaylists();
        $('.playlistSelectDropdown').removeClass('hidden');
        $('.playlistNavigateMenuDropdown').removeClass('hidden');
      }
    }.bind(this));
    this.props.model.on('currentPlaylistNewName', function () {
      console.log('playlistTitle heard currentPlaylistNewName');
      if (this.props.app.get('user').get('current_playlist')) {
        this.getUsersPlaylists();
        $('.playlistSelectDropdown').removeClass('hidden');
        $('.playlistNavigateMenuDropdown').removeClass('hidden');
      }
    }.bind(this));

  },
  getUsersPlaylists: function () {
    var context = this;
    if (this.props.app.get('user').get('id') !== 0) {
      $.ajax({url: server_uri + '/api/users/' + this.props.app.get('user').get('id') + '/playlists/',
        type: 'GET',
        success: function (res) {
          console.log('got playlist');
          console.log(res);
          var playlistNames = res.map(function(e) {
            return {id: e.id, text: e.name};
          });
          console.log(playlistNames);
          context.setState({ playlistData: playlistNames })
          context.handleNewCurrentPlaylist();
        },
        error: function (res) {
          console.log("error: " + res.statusText);
        }
      });
    } else {
      console.log('not logged in');
    }
  },
  handleNewCurrentPlaylist: function () {
    if (this.props.app.get('user').get('current_playlist').get('name')) {
      this.setState({ title: this.props.app.get('user').get('current_playlist').get('name') });
    } else {
      this.setState({ title: 'No Playlist Title' });
    }
  },
  swapPlaylist: function (e) {
    console.log('user clicked playlist #', e.target.getAttribute('data-playlistid'));
    var newPlaylistId = e.target.getAttribute('data-playlistid')
    var context = this;
    if (this.props.app.get('user').get('id') !== 0) {
      $.ajax({url: 'api/users/' + this.props.app.get('user').get('id') + '/playlists/' + newPlaylistId + '/current',
        type: 'PUT',
        success: function (res) {
          console.log('user current_playlist_id changed to ', newPlaylistId);
          context.props.app.get('user').set('current_playlist_id', newPlaylistId);
          context.props.app.get('user').set('current_playlist', context.props.app.get('user').get('playlists').get(newPlaylistId));
        },
        error: function (res) {
          console.log("error: " + res.statusText);
        }
      });
    } else {
      console.log('not logged in');
    }
  },
  render: function (){
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
    };
    var playlistItems = this.state.playlistData.map((function (item, i) {
      return (
        <li data-id={i} key={i}><a data-playlistid={item.id} onClick={this.swapPlaylist}>
          {item.text}
        </a></li>
      );
    }).bind(this));
    return (
      <div>
      <h4 className='playlistTitleContainer text-center' style={style}>
        <div style={dropdownStyle} className="playlistSelectDropdown btn-group pull-left hidden">
          <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="caret"></span>
          </button>
          <ul className="dropdown-menu dropdown-menu-left">
            {playlistItems}
          </ul>
        </div>
        {this.state.title}
        <div style={dropdownStyle} className="playlistNavigateMenuDropdown btn-group pull-right hidden">
          <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="glyphicon glyphicon-list" aria-hidden="true"></span>
          </button>
          <ul className="dropdown-menu dropdown-menu-right">
            <li><a onClick={this.props.newPlaylistClick}>New Playlist</a></li>
            <li><a onClick={this.props.renamePlaylistClick}>Rename Playlist</a></li>
            <li><a onClick={this.props.deletePlaylistClick}>Delete Playlist</a></li>
          </ul>
        </div>
      </h4>
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
          console.log('id: ', res.id);
          console.log(res);
          context.props.app.get('user').set('current_playlist_id', res.id);
          playlist.set('id', res.id);
          context.props.app.get('user').set('current_playlist', playlist);
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
    } else {
      console.log('not logged in');
    }
  },
  deleteCurrentPlaylist: function () {
    console.log('user confirmed delete and parent heard')
    var context = this;
    if (this.props.app.get('user').get('id') !== 0) {
      $.ajax({url: server_uri + '/api/users/' + this.props.app.get('user').get('id') + '/playlists/' + this.props.app.get('user').get('current_playlist_id'),
        type: 'DELETE',
        success: function (res) {
          var newPlaylistId = res.current_playlist_id;
          context.props.app.get('user').set('current_playlist_id', newPlaylistId);
          context.props.app.get('user').set('current_playlist', context.props.app.get('user').get('playlists').at(newPlaylistId));
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
  render: function () {
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
        <DeletePlaylistModal close={this.close} deleteCurrentPlaylist={this.deleteCurrentPlaylist} showDeletePlaylist={this.state.showDeletePlaylist} app={this.props.app}/>
        <NewPlaylistModal close={this.close} createNewPlaylist={this.createNewPlaylist} showNewPlaylist={this.state.showNewPlaylist} app={this.props.app}/>
        <RenamePlaylistModal close={this.close} submitUpdatePlaylist={this.submitUpdatePlaylist} showRenamePlaylist={this.state.showRenamePlaylist} app={this.props.app}/>
        <PlaylistTitle renamePlaylistClick={this.renamePlaylistClick} newPlaylistClick={this.newPlaylistClick} deletePlaylistClick={this.deletePlaylistClick} model={this.props.app.get('user')} data={[]} title={'Sign in to create a Playlist!'} app={this.props.app}/>
        <Songs app={this.props.app}/>
      </div>
    );
  }
});

module.exports = Playlist;
