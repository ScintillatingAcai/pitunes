var db = require('../schema');

var Room = db.Model.extend({
  tableName: 'Rooms',
  hasTimestamps: true
});

module.exports = Room;
