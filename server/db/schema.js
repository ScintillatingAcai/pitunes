var knex = require('./knex-config');
var bookshelf = require('bookshelf')(knex);

bookshelf.knex.schema.hasTable('Rooms').then(function(exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('Rooms', function (room) {
      room.increments('id').primary();
      room.string('name', 50).notNullable();
      room.boolean('private').defaultTo(false);
      room.string('password', 100).defaultTo('');
      room.timestamps();
    }).then(function (table) {
      console.log('Created Table Rooms');
      // return bookshelf.knex.insert({name: 'root', created_at: "2015-07-15 00:00:00", updated_at: "2015-07-15 00:00:00"}).into('Rooms');
    // }).then( function ( results) {
    //   console.log('Created Root Room');
    });
  }
});

bookshelf.knex.schema.hasTable('Medias').then(function(exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('Medias', function (media) {
      media.increments('id').primary();
      media.string('youtube_id', 100).notNullable();
      media.integer('play_count').unsigned().defaultTo(0);
//      media.string('name', 255).defaultTo('');
      media.timestamps();
    }).then(function (table) {
      console.log('Created Table Medias');
    });
  }
});

bookshelf.knex.schema.hasTable('Users').then(function(exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('Users', function (user) {
      user.increments('id').primary();
      user.string('email', 50).unique().notNullable();
      user.string('password', 100);
      user.string('oauth', 30);
      user.string('display_name', 50).notNullable().defaultTo('Anonymous');
      user.string('icon', 100);
      user.string('location', 100);
      user.integer('current_playlist_id').unsigned().defaultTo(0);//.references('id').inTable('Playlists');
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table Users');
      bookshelf.knex.schema.hasTable('Playlists').then(function(exists) {
        if (!exists) {
          bookshelf.knex.schema.createTable('Playlists', function (playlist) {
            playlist.increments('id').primary();
            playlist.integer('user_id').unsigned().references('id').inTable('Users');
            playlist.string('name', 50).notNullable();
            playlist.integer('current_media_index').defaultTo(1);//.references('order').inTable('Media_Playlists');
            // playlist.boolean('current');
            // playlist.unique(['user_id', 'current']);
            playlist.timestamps();
          }).then(function (table) {
            console.log('Created Table Playlists');
            bookshelf.knex.schema.hasTable('Media_Playlists').then(function(exists) {
              if (!exists) {
                bookshelf.knex.schema.createTable('Media_Playlists', function (playlist) {
                  playlist.increments('id').primary();
                  playlist.integer('playlist_id').unsigned().references('id').inTable('Playlists');
                  playlist.integer('media_id').unsigned().references('id').inTable('Medias');
                  playlist.integer('media_order', 8).unsigned().notNullable();
                  playlist.unique(['playlist_id', 'media_order']);
                }).then(function (table) {
                  console.log('Created Table Media Playlists');
                });
              }
            });
          });
        }
      });
    });
  }
});

bookshelf.knex.schema.hasTable('Users_Rooms').then(function(exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('Users_Rooms', function (room) {
      room.increments('id').primary();
      room.integer('user_id').unsigned().references('id').inTable('Users');
      room.integer('room_id').unsigned().references('id').inTable('Rooms');
      room.timestamps();
    }).then(function (table) {
      console.log('Created Table Users_Rooms');
    });
  }
});



module.exports = bookshelf;
