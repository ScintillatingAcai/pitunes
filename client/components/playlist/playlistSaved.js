var placeholder = document.createElement("li");
placeholder.className = "placeholder";

var List = React.createClass({
  getInitialState: function() {
    return { data: this.props.data };
  },
  onClick: function(e) {
    console.log(e.currentTarget.lastChild)
  },
  dragStart: function(e) {
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
    
    // Firefox requires dataTransfer data to be set
    e.dataTransfer.setData("text/html", e.currentTarget);
  },
  dragEnd: function() {
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
  },
  dragOver: function(e) {
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
      this.nodePlacement = "before"
      parent.insertBefore(placeholder, e.target);
    }
  },
  render: function() {
    var style = {
      cursor: 'pointer',
      marginBottom: '5px',
      padding: '0',
      margin: '0'
    }
    var listItems = this.state.data.map((function(item, i) {
      return (
        <li style={style} data-id={i}
            key={i}
            draggable="true"
            onDragEnd={this.dragEnd}
            onDragStart={this.dragStart}
            onClick={this.onClick}>
          {item}
        </li>
      );
    }).bind(this));

    return (
      <ul onDragOver={this.dragOver}>{listItems}</ul>
    );
  }
});

//list of dummy user data
var dummyUser = {
  playlistSongs: {
    0: 'I Am The Doctor - Murray Gold',
    1: 'Song Of Freedom - Murray Gold',
    2: 'SkyWorld - Two Steps From Hell',
    3: 'Dance of the Druids - Bear McCreary',
    4: 'A New Beginning - Alexandre Desplat',
    5: 'The Fields of The Pelenor - Lord of the Rings 3 Soundtrack', 
    6: 'Sol Invictus - Audiomachine',
    7: 'El Dorado - Two Steps From Hell'
  }
}

//take the songs from the data user
var objSongs = dummyUser.playlistSongs;
var arrSongs = [];
for (var key in objSongs) {
  arrSongs.push(objSongs[key]);
}

var Songs = React.createClass({
  render: function() {
    return (
      <List data={arrSongs}/> 
    );
  }
});

var PlaylistTitle = React.createClass({
  render: function(){
    var style = {
      textAlign: 'center'
    };
    return (
      <h3 style={style}>Movie Scores Playlist</h3>
    );
  }
});

var PlaylistSaved = React.createClass({
  render: function() {
    var style = {
      background: '#eee',
      position: 'absolute', 
      width: '100%',
      height: '40%',
      overflow: 'auto',
      resize: 'both'
    };
    return (
      <div style={style}>
        <PlaylistTitle />
        <Songs />
      </div>
    );
  }
});