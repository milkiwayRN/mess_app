import * as express from 'express';
import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';

import authenticationMiddleware from '../authentication/middleware'
import { PassportStatic } from 'passport';
import * as jwt from 'jsonwebtoken';

import { UserModel } from '../models/UserModel';
import { IUser } from '../interfaces/User';

function initApiRouter(passport: PassportStatic) {
  const api = express.Router();

  api.all('*', authenticationMiddleware, function (req, res, next) {
    next();
  });

  api.get('/me', (req, res) => {
    if (req.isAuthenticated()) {
      res.json(req.user);
    }
    else {
      res.send(401);
    }

  });

  api.post('/me', function (req, res, next) {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user: user,
          err,
          info,
        });
      }

      const userResponse = {
        _id: user._id,
        email: user.email,
      };

      req.login(userResponse, { session: false }, (err) => {
        if (err) {
          res.status(400).json({ err, user });
        }
        // generate a signed son web token with the contents of user object and return it in the response
        const token = jwt.sign(userResponse, 'your_jwt_secret');
        return res.json({ user: userResponse, token });
      });
    })(req, res);
  });

  api.put('/me', function (req, res, next) {
    const newUser = req.body;
    UserModel.findOne({ email: newUser.email }, (err, user) => {
      if (err) {
        res.send(500);
      }
      if (!user) {
        const saltRounds = 15;
        const salt = bcrypt.genSaltSync(saltRounds);
        const passwordHash = bcrypt.hashSync(newUser.password, salt);
        const userData = <IUser>{
          _id: new mongoose.Types.ObjectId(),
          email: newUser.email,
          passwordHash: passwordHash,
        };
        UserModel.create(userData, (err: any, response: any) => {
          if (err) {
            res.send(500);
          }
          else {
            res.status(200).json(response);
          }
        });
      }
    })
  });

  return api;
}



export default initApiRouter;