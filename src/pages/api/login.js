import knex from './_dbInstance';
import jwt from 'jsonwebtoken';

const secret = '710e5388-9864-4e7c-8661-3de69fa49ff2';

export default function Login(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  knex
    .select('id', 'username', 'password')
    .from('user')
    .where({ username: username })
    .then((rows) => {
      if (rows.length === 1) {
        const token = jwt.sign({ id: rows[0].id, username: rows[0].username }, secret);
        // if exists login
        if (rows[0].password === password) {
          res.writeHead(201, {
            'Set-Cookie': `session_id=${token};SameSite=Strict;Expires=${new Date().toUTCString()};Max-Age=3200;path=/`
          });
          res.end(res.getHeader('Set-Cookie'));
        } else {
          res.status(401).end();
        }
      } else {
        // if not exists register and login
        knex('user').insert({ username, password }).then((userId) => {
          knex
            .select('id', 'username')
            .from('user')
            .where({ id: userId })
            .then((userInfo) => {
              const token = jwt.sign({ id: userInfo[0].id, username: userInfo[0].username }, secret);
              res.writeHead(201, {
                'Set-Cookie': `session_id=${token};SameSite=Strict;Expires=${new Date().toUTCString()};Max-Age=3200;path=/`
              });
              res.end();
            })
            .catch((e) => console.log(e.message));
        });
      }
    })
    .catch((err) => console.log(err));
}
