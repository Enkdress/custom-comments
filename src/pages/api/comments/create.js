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
  const username = JSON.parse(req.body).username;
  const comment = JSON.parse(req.body).comment;

  knex('comment')
    .insert({ username: username, description: comment })
    .then((val) => res.json({ val }))
    .catch((e) => res.json({ e }))
    .finally(() => {
      res.end();
    });
}
