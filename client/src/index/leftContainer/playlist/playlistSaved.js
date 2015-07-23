var placeholder = document.createElement("div");
placeholder.className = "placeholder";

var List = React.createClass({

  getInitialState: function () {
    return { data: this.props.data, text: ''};
  },

  handleClickedSearch: function () {
    this.setState({data: arrSongs});
  },

  componentDidMount: function () {
    $('#searchResults').on('click', 'li', this.handleClickedSearch);
  },

  onClick: function (e) {
    console.log(e.currentTarget.lastChild);
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
    this.setState({data: data});
    this.submitUpdatePlaylist(user.current_playlist);
  },

  dragOver: function (e) {
    e.preventDefault();
    this.dragged.style.display = "none";
    if (e.target.className === "placeholder") return;
    this.over = e.target;
    // Inside the dragOver method
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
    user.current_playlist = {name: this.state.text, songs: []};
    this.submitNewPlaylist(user.current_playlist);
  },

  // PLACEHOLDERS
  // ***
  submitNewPlaylist: function (playlist) {
    if (user.id !== 0) {
      var context = this;
      $.ajax({url: server_uri + '/api/users/' + user.id + '/playlists',
        type: 'POST',
        dataType: 'json',
        data: playlist,
        success: function (res) {
          user.current_playlist_id = res.id;
          user.current_playlist = {name: res.name, songs: []}
          populatePlaylist();
          context.handleClickedSearch();
          console.log('submitted new playlist');
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
    var context = this;
    if (user.id !== 0) {
      $.ajax({url: server_uri + '/api/users/' + user.id + '/playlists/' + user.current_playlist.id,
        type: 'PUT',
        dataType: 'json',
        data: playlist,
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
  // ***
  // END PLACEHOLDERS

  render: function () {
    var style = {
      cursor: 'pointer',
      padding: '0',
      margin: '0 0 0 10px',
      color: '#FFFFFF',
      fontSize: '10px',
      listStyleType: 'none'
    };
    var buttonStyle = {
      backgroundColor: 'white',
      color: 'black',
      padding: '0 0 0 0',
      margin: '0 0 0 2px'
    };
    var listItems = this.state.data.map((function (item, i) {
      return (
        <div style={style} data-id={i}
          key={i}
          draggable="true"
          onDragEnd={this.dragEnd}
          onDragStart={this.dragStart}
          onClick={this.onClick}>
          {item}
          <button style={buttonStyle}>Top</button>
          <button style={buttonStyle}>Bot</button>
          <button style={buttonStyle}>Rem</button>
        </div>

      );
    }).bind(this));
    var searchBarInputStyle = {
      backgroundColor: '#AAAAAA',
      borderColor: '#EEEEEE',
      width: '30px'
    };
    return (
      <div>
        <button className='buttonNewPlaylist' onClick={this.createNewPlaylist}>New Playlist</button>
        <button className='buttonSavePlaylist' onClick={this.savePlaylist}>Save Playlist</button>
        <input style={searchBarInputStyle} onChange={this.onNameChange} value={this.state.text} placeholder="Name Playlist"/>
        <div onDragOver={this.dragOver}>{listItems}</div>
      </div>
    );
  }
});

//list of dummy user data
user.current_playlist = {
  name: 'Test Playlist',
  id: 4,
  songs: [
    {
      img_url: 'https://i.ytimg.com/vi/2HQaBWziYvY/default.jpg',
      title: 'Darude - Sandstorm',
      youtube_id: '2HQaBWziYvY',
      duration: 224
    },
    {
      img_url: 'https://i.ytimg.com/vi/59CZt1xsh5s/default.jpg',
      title: 'The Growlers - One Million Lovers',
      youtube_id: '59CZt1xsh5s',
      duration: 278,
    },
    {
      img_url: 'https://i.ytimg.com/vi/BYbJmQj5VkE/default.jpg',
      title: 'FIDLAR - No Waves (Music Video)',
      youtube_id: 'BYbJmQj5VkE',
      duration: 190,
    }
  ]
};


var durationToDisplay = function (duration) {
  // duration = this.convertYTDuration(duration);
  var minutes = Math.floor(duration / 60) + "";
  if (minutes.length === 1) {
    minutes = "0" + minutes;
  }
  var seconds = duration % 60 + "";
  if (seconds.length === 1) {
    seconds = "0" + seconds;
  }
  return minutes + ":" + seconds;
};

//take the songs from the user data
var arrSongs;
var populatePlaylist = function() {
  arrSongs = [];
  for (var song in user.current_playlist.songs) {
    var displayTime = durationToDisplay(user.current_playlist.songs[song].duration);
    arrSongs.push([user.current_playlist.songs[song].title + ' | ' + displayTime]);
  }
};

populatePlaylist();

var getPlaylists = function() {
  if (user.id !== 0) {
    $.ajax({url: server_uri + '/api/users/' + user.id + '/playlists/',
      type: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log('Retrieved playlists', res);
        user.playlists = res;
        // NEED TO HANDLE NEW USERS FIRST PLAYLIST
        if (user.current_playlist_id !== 0) {
          user.current_playlist = user.playlists[user.current_playlist_id]
        }
        getCurPlaylistSongs();
      },
      error: function(res) {
        console.log('errorMessage: ' + res.statusText);
      }
    });
  }
};

var getCurPlaylistSongs = function() {
  if (user.id !== 0) {
    $.ajax({url: server_uri + '/api/users/' + user.id + '/playlists/' + user.current_playlist_id,
      type: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log('Retrieved playlists', res);
        user.current_playlist.songs = res;
      },
      error: function(res) {
        console.log('errorMessage: ' + res.statusText);
      }
    });
  }
};


var addSongToPlaylist = function (songNode) {
  user.current_playlist.songs.push(songNode);
  console.log("Added ", songNode, " to playlist");
  populatePlaylist();
}

var Songs = React.createClass({
  render: function() {
    return (
      <List data={arrSongs} />
    );
  }
});

var PlaylistTitle = React.createClass({
  getInitialState: function() {
    return {title: this.props.title}
  },
  // componentDidMount: function() {
  //   $('#playlistContainer div').on('click', '.buttonNewPlaylist', this.handleNewPlaylist)
  // },
  // handleNewPlaylist: function() {
  //   this.setState({title: user.current_playlist.name});
  // },
  render: function(){
    var style = {
      textAlign: 'center',
      color: 'white',
      marginTop: '10px',
      paddingBottom: '10px',
      borderBottom: '2px solid #444444'
    };
    return (
      <h4 style={style}>{this.state.title}</h4>
    );
  }
});

var PlaylistSaved = React.createClass({
  render: function() {
    var style = {
      background: '#222222',
      border: '2px solid #444444',
      position: 'absolute',
      width: '100%',
      height: '50%',
      overflow: 'auto',
      textAlign: 'left',
      bottom: '0'
    };
    return (
      <div id="playlistContainer" style={style}>
        <PlaylistTitle title={user.current_playlist.name}/>
        <Songs />
      </div>
    );
  }
});