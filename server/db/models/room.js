var db = require('../schema');

var Room = db.Model.extend({
  tableName: 'Rooms',
  hasTimestamps: true,

  djQueue: [],

  pushDJQueue: function(dj_id) {
    var User = require('./user');
    new User({id:dj_id}).fetch().then(function(dj) {
      djQueue.push(dj);
    });

  },

  popDJQueue: function() {
    return djQueue.pop();
  },

  removeDJFromQueue: function(dj_id) {
    var popDJ;
    var queueIndex;

    djQueue.forEach(function(dj,index) {
      if (dj.id === dj_id) {
        popDJ = dj;
        queueIndex = index;
      }
    });

    djQueue.splice(queueIndex,1);
    return popDJ;
  }
});

module.exports = Room;
