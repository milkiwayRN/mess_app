import * as express from 'express';

import authenticationMiddleware from '../authentication/middleware'
import { PassportStatic } from 'passport';

function initApiRouter(passport: PassportStatic) {
  const api = express.Router();

  api.all('*', authenticationMiddleware, function (req, res, next) {
    next();
  });

  api.get('/me', (req, res) => {
    if (req.isAuthenticated()) {
      res.json({ username: req.user.username });
    }
    else {
      res.send(401);
    }
    
  });

  api.post('/me', passport.authenticate('local'), (req, res) => {
    res.json({ username: req.user.username });
  });

  return api;
}

export default initApiRouter;