const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'comments'
  },
  pool: {min: 0, max: 7}
});

export default knex;
