import knex from '../_dbInstance';
import Cors from 'cors';

const cors = Cors({
  methods: [ 'GET', 'POST' ]
});

function withCors(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function Comments(req, res) {
  await withCors(req, res, cors);

  const response = [];
  knex
    .select('id', 'description', 'created_at', 'username')
    .from('comment')
    .then((rows) => {
      rows.map((row) => {
        response.push({
          id: row.id,
          username: row.username,
          comment: row.description,
          createdAt: row.created_at
        });
      });
      res.json({ comments: response });
      res.end();
    })
    .catch((e) => console.log(e.message));
}
