var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: process.env.RDS_HOSTNAME || '127.0.0.1',
    user: process.env.RDS_USERNAME || 'root',
    password: process.env.RDS_PASSWORD || null,
    port: process.env.RDS_PORT || null,
    database: process.env.RDS_DB_NAME || 'piTunes',
    charset: 'utf8'
  }
});

module.exports = knex;


