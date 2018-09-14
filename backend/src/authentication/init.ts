const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

import authenticationMiddleware from './middleware';
import { Strategy } from 'passport';

// Generate Password
const saltRounds = 10
const myPlaintextPassword = 'my-password'
const salt = bcrypt.genSaltSync(saltRounds)
const passwordHash = bcrypt.hashSync(myPlaintextPassword, salt)

interface User {
    username: string;
    passwordHash: any;
    id: any;
};

const user: User = {
    username: 'test-user',
    passwordHash,
    id: 1
};

function findUser(username: string, callback: Function) {
    if (username === user.username) {
        return callback(null, user)
    }
    return callback(null)
}

passport.serializeUser(function (user: User, cb: any) {
    cb(null, user.username)
})

passport.deserializeUser(function (username: string, cb: any) {
    findUser(username, cb)
})

function initPassportStrategy(): Strategy {
    console.log('STR VER 1');
    return (new LocalStrategy({
        usernameField: 'email',
        passwordField: 'passwd',
    },
        (username: string, password: any, done: any) => {
            console.log(username, password);
            findUser(username, (err: any, user: User) => {
                if (err) {
                    return done(err)
                }

                // User not found
                if (!user) {
                    console.log('User not found')
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


export default initPassportStrategy;