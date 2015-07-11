var async = require('async');
var knex = require('./knex-config');
var bookshelf = require('bookshelf')(knex);

var initialize = function(err, results) {
  if(err) console.log(err);
  require('./db-initialize');
}

async.parallel([
  function (callback) {
    bookshelf.knex.schema.hasTable('users').then(function(exists) {
      if (!exists) {
        bookshelf.knex.schema.createTable('users', function (user) {
          user.increments('id').primary().unsigned();
          user.string('firstName', 30);
          user.string('lastName', 30);
          user.string('username', 40).unique();
          user.string('email', 40).unique();
          user.bigInteger('phone', 11);
          user.string('salt', 40);
          user.string('password', 100);
          user.timestamps();
        }).then(function (table) {
          console.log('Created Table users');
          callback();
        });
      } else {
        callback();
      }
    });
  },

  function(callback) {
    bookshelf.knex.schema.hasTable('incidentTypes').then(function(exists) {
      if (!exists) {
        bookshelf.knex.schema.createTable('incidentTypes', function (incidentType) {
          incidentType.increments('id').primary().unsigned();
          incidentType.string('type', 20);
          incidentType.string('iconFilename', 50);
        }).then(function (table) {
          console.log('Created Table incidentTypes');
          callback();
        });
      } else {
        callback();
      }
    });
  },

  function(callback) {
    bookshelf.knex.schema.hasTable('incidents').then(function(exists) {
      if (!exists) {
        bookshelf.knex.schema.createTable('incidents', function (incident) {
          incident.increments('id').primary().unsigned();
          incident.integer('userId', 11).references('id').inTable('users').unsigned();
          incident.integer('incidentTypeId', 11).references('id').inTable('incidentTypes').unsigned();
          incident.integer('votes', 0);
          incident.string('description', 255);
          incident.float('latitude', 10, 6);
          incident.float('longitude', 10, 6);
          incident.string('address', 100);
          incident.string('fuzzyAddress', 100);
          incident.dateTime('occurred_at');
          incident.timestamps();
        }).then(function (table) {
          console.log('Created Table incidents');
          callback();
        });
      } else {
        callback();
      }
    });
  },
  
  function(callback) {
    bookshelf.knex.schema.hasTable('messages').then(function(exists) {
      if (!exists) {
        bookshelf.knex.schema.createTable('messages', function (message) {
          message.increments('id').primary().unsigned();
          message.string('description', 255);
          message.integer('userId', 11).references('id').inTable('users').unsigned();
          message.integer('incidentsId', 11).references('id').inTable('incidents').unsigned();
          message.timestamps();
        }).then(function (table) {
          console.log('Created Table messages');
          callback();
        });
      } else {
        callback();
      }
    });
  }
], initialize);

console.log('config file run');


module.exports = bookshelf;
