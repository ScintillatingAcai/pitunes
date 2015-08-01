var React = require('react');
var $ = require('jquery');
var MediaModel = require('../../../data/models/media.js');
var UserAttemptModal = require('./userattemptmodal.jsx');
var YOUTUBE_API_KEY = 'AIzaSyA_ZnEUUw8uGbEdGfBXH296QX-1nnyeJnQ';

var SearchBar = React.createClass({
  getInitialState: function () {
    return { showUserAttempt: false, text: '' };
  },
  handleChange: function (e) {
    e.preventDefault();
    this.setState({text: e.target.value});
    if (e.target.value !== '') {
      this.searchYouTube(e.target.value);
    }
    if (e.target.value === '') {
      $(".searchResultItem").remove();
    }
  },
  handleSubmit: function (e) {
    e.preventDefault();
  },
  handleUserAttempt: function () {
    this.setState({ showUserAttempt: true});
  },
  close: function () {
    this.setState({ showUserAttempt: false});
  },
  escapeDQ: function (string) {
    return string.replace(/\"/g, "'");
  },
  // Convert YouTube ISO 8061 Format to Int equal to total number of seconds in video
  convertYTDuration: function (duration) {
    var a = duration.match(/\d+/g);

    if (duration.indexOf('M') >= 0 && duration.indexOf('H') === -1 && duration.indexOf('S') === -1) {
      a = [0, a[0], 0];
    }
    if (duration.indexOf('H') >= 0 && duration.indexOf('M') === -1) {
      a = [a[0], 0, a[1]];
    }
    if (duration.indexOf('H') >= 0 && duration.indexOf('M') === -1 && duration.indexOf('S') === -1) {
      a = [a[0], 0, 0];
    }
    duration = 0;
    if (a.length === 3) {
      duration = duration + parseInt(a[0]) * 3600;
      duration = duration + parseInt(a[1]) * 60;
      duration = duration + parseInt(a[2]);
    }
    if (a.length === 2) {
      duration = duration + parseInt(a[0]) * 60;
      duration = duration + parseInt(a[1]);
    }
    if (a.length === 1) {
      duration = duration + parseInt(a[0]);
    }
    return duration;
  },
  // Convert ISO 8061 format to MM:SS
  // TODO: Either filter out videos longer than 59:59 or extend to HH:MM:SS format
  convertYTDurationDisplay: function (duration) {
    duration = this.convertYTDuration(duration);
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
  searchYouTube: function (query) {
    var encodedQuery = encodeURIComponent(query);
    var searchUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&order=viewCount&q=' + encodedQuery + '&key=' + YOUTUBE_API_KEY;
    var context = this;
    $.ajax({
      type: "GET",
      url: searchUrl,
      success: function (response) {
        var results = [];
        var resultsIds = [];
        response.items.forEach(function (e) {
          if (e.id.videoId) {
            results.push({
              img: e.snippet.thumbnails.default.url,
              title: e.snippet.title,
              id: e.id.videoId
            });
            resultsIds.push(e.id.videoId);
          }
        });
        var videoIds = "";
        for (var i = 0; i < results.length; i++) {
          videoIds += results[i].id + ',';
        }
        var videoMap = {};
        var durationSearchUrl = 'https://www.googleapis.com/youtube/v3/videos?id=' + videoIds + '&part=contentDetails&key=' + YOUTUBE_API_KEY;
        $.ajax({
          type: "GET",
          url: durationSearchUrl,
          success: function (response) {
            response.items.forEach(function (e) {
              videoMap[e.id] = e.contentDetails.duration;
            });
            for (var j = 0; j < results.length; j++) {
              results[j].duration = context.convertYTDuration(videoMap[results[j].id]);
              results[j].durationDisplay = context.convertYTDurationDisplay(videoMap[results[j].id]);
            }
            $(".searchResultItem").remove();
            results.forEach(function (e) {
              $('#searchResults').append('<li class="searchResultItem" style="margin-bottom:10px; margin-left:-30px; list-style:none;"><img className="searchResultImg" style="height:50px; width:50px; margin-right:5px;" src="' + e.img + '" /><div className="searchResultTitle" style="color:#FFF; font-size:10px; display:inline; cursor:pointer;" data-durationDisplay="' + e.durationDisplay + '" data-duration="' + e.duration + '" data-title="' + context.escapeDQ(e.title) + '" data-youtubeid="' + e.id + '" data-img="' + e.img + '"> ' + (e.title).slice(0, 35) + '...' + '</div><div style="color:#FFF; font-size:10px; display:inline;"> | ' + e.durationDisplay + '</div></li>');
            });
            $(".searchResultItem").on('click', function (e) {
              if ($(e.target).attr('className') === 'searchResultTitle') {
                if (context.props.app.get('user').get('current_playlist_id')) {
                  var newSong = new MediaModel({
                    title: $(e.target).attr('data-title'),
                    youtube_id: $(e.target).attr('data-youtubeid'),
                    img_url: $(e.target).attr('data-img'),
                    duration: parseInt($(e.target).attr('data-duration'), 10)
                  });
                  var addIndex = context.props.app.get('user').get('current_playlist').get('current_media_index');
                  context.props.app.get('user').get('current_playlist').get('medias').add(newSong, {at: addIndex});
                  $("body").css("cursor", "progress");
                  context.props.app.get('user').trigger('newSong');
                } else {
                  context.setState({ showUserAttempt: true });
                }
              }
            });
          }
        });
      }
    });
  },
  render: function () {
    var style = {
      borderColor: '#333',
      position: 'absolute',
      top: 0,
      width: '100%'
    };
    var searchBarInputStyle = {
      backgroundColor: '#DDDDDD',
      borderColor: '#333'
    };
    var searchResultsStyle = {
      marginTop: '50px'
    };
    return (
      <div>
        <UserAttemptModal showUserAttempt={this.state.showUserAttempt} close={this.close} app={this.props.app} />
        <ul id="searchResults" style={searchResultsStyle}></ul>
        <form style={style}>
          <input style={searchBarInputStyle} onChange={this.handleChange} onSubmit={this.handleSubmit} value={this.state.text} className="form-control" placeholder="Search YouTube"/>
        </form>
      </div>
    );
  }
});

var MediaAdd = React.createClass({
  render: function() {
    var style = {
      background: '#222222',
      border: '1px solid #333',
      position: 'absolute',
      width: '100%',
      height: '50%',
      overflow: 'auto',
      top: '0'
    };
    return (
      <div style={style}>
        <SearchBar app={this.props.app}/>
      </div>
    );
  }
});

module.exports = MediaAdd;
