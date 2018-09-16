import * as express from 'express';

import authenticationMiddleware from '../authentication/middleware'
import { PassportStatic } from 'passport';
import * as jwt from 'jsonwebtoken';

function initApiRouter(passport: PassportStatic) {
  const api = express.Router();

  api.all('*', authenticationMiddleware, function (req, res, next) {
    next();
  });

  api.get('/me', (req, res) => {
    console.log('USER IN GET', req.isAuthenticated())
    if (req.isAuthenticated()) {
      res.json({ username: req.user.username });
    }
    else {
      res.send(401);
    }
    
  });

  api.post('/me', function (req, res, next) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user   : user
            });
        }
       req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err);
           }
           // generate a signed son web token with the contents of user object and return it in the response
           const token = jwt.sign(user, 'your_jwt_secret');
           return res.json({user, token});
        });
    })(req, res);
});

  return api;
}



export default initApiRouter;