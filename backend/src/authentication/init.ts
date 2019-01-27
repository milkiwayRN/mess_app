const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

import { UserModel } from '../models/UserModel';
import { IUser } from '../interfaces/User';
import { Strategy } from 'passport';

// Generate Password
const saltRounds = 15;
const myPlaintextPassword = 'my-password';
const salt = bcrypt.genSaltSync(saltRounds);
const passwordHash = bcrypt.hashSync(myPlaintextPassword, salt);

interface User {
    username: string;
    passwordHash: any;
    id: any;
};

const user: User = {
    username: 'test-user@example.com',
    passwordHash,
    id: 1
};

function findUser(email: string, callback: Function) {
    UserModel.findOne({ email }, (err, user: IUser) => {
        if (!err && user) {
            return callback(null, user);
        }
        else {
            return callback(null);
        }
    });
}

passport.serializeUser(function (user: User, cb: any) {
    cb(null, user)
})
/*
passport.deserializeUser(function (username: string, cb: any) {
    findUser(username, cb)
})
*/

function initPassportLocalStrategy(): Strategy {
    return (new LocalStrategy({
        usernameField: 'email',
        passwordField: 'passwd',
    },
        (username: string, password: any, done: any) => {
            findUser(username, (err: any, user: IUser) => {
                if (err) {
                    return done(err)
                }

                // User not found
                if (!user) {
                    return done(null, false)
                }

                // Always use hashed passwords and fixed time comparison
                bcrypt.compare(password, user.passwordHash, (err: any, isValid: boolean) => {
                    if (err) {
                        return done(err)
                    }
                    if (!isValid) {
                        return done(null, false)
                    }
                    return done(null, user)
                })
            })
        }
    ))
}


export default initPassportLocalStrategy;