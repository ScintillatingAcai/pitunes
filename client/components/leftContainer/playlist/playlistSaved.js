var placeholder = document.createElement("div");
placeholder.className = "placeholder";

var List = React.createClass({

  getInitialState: function () {
    return { data: this.props.data };
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
    this.submitUpdatePlaylist(playlistMin);
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
    currentUser.currentPlaylist = {title: 'New Playlist', songs: []};
    this.submitNewPlaylist(playlistMin);
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
          currentUser.currentPlaylist.Id = res.playlist_id;
          console.log('submitted new playlist');
          populatePlaylist();
          context.handleClickedSearch();
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
      $.ajax({url: server_uri + '/api/users/' + user.id + '/playlists/' + currentUser.currentPlaylist.id,
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
    }
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

    return (
      <div>
        <button className='buttonNewPlaylist' onClick={this.createNewPlaylist}>New Playlist</button>
        <div onDragOver={this.dragOver}>{listItems}</div>
      </div>
    );
  }
});

//list of dummy user data
var currentUser = {
  currentPlaylist: {
    name: 'Test Playlist',
    id: 0,
    songs: [
      {
        img_url: 'https://i.ytimg.com/vi/2HQaBWziYvY/default.jpg',
        title: 'Darude - Sandstorm',
        id: '2HQaBWziYvY',
        duration: 224,
        durationDisplay: '03:44'
      },
      {
        img: 'https://i.ytimg.com/vi/59CZt1xsh5s/default.jpg',
        title: 'The Growlers - One Million Lovers',
        id: '59CZt1xsh5s',
        duration: 278,
        durationDisplay: '04:38'
      },
      {
        img: 'https://i.ytimg.com/vi/BYbJmQj5VkE/default.jpg',
        title: 'FIDLAR - No Waves (Music Video)',
        id: 'BYbJmQj5VkE',
        duration: 190,
        durationDisplay: '03:10'
      }
    ]
  }
};


//take the songs from the user data
var arrSongs;
var playlistMin;
var populatePlaylist = function() {
  arrSongs = [];
  playlistMin = {name: currentUser.currentPlaylist.name, songs: []};
  for (var song in currentUser.currentPlaylist.songs) {
    arrSongs.push([currentUser.currentPlaylist.songs[song].title + ' | ' + currentUser.currentPlaylist.songs[song].durationDisplay]);
    playlistMin.songs.push(currentUser.currentPlaylist.songs[song].id);
  }
};

populatePlaylist();

var addSongToPlaylist = function (songNode) {
  currentUser.currentPlaylist.songs.push(songNode);
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
  render: function(){
    var style = {
      textAlign: 'center',
      color: 'white',
      marginTop: '10px',
      paddingBottom: '10px',
      borderBottom: '2px solid #444444'
    };
    return (
      <h4 style={style}>{currentUser.currentPlaylist.name}</h4>
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
        <PlaylistTitle />
        <Songs />
      </div>
    );
  }
});