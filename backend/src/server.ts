import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import * as passport from 'passport';
import * as session from 'express-session';
import * as RedisStore from 'connect-redis';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';

import mainRouter from './routers/MainRouter';
import initPassportLocalStrategy from './authentication/init';
import initJWTStrategy from './authentication/jwtAuth';
import config from '../config/config';
import initApi from './routers/ApiRouter';
import getDialogs from './webSockets/getDialogs';
 
mongoose.connect('mongodb://localhost/messengerDB');

const app = express();

passport.use(initPassportLocalStrategy());
passport.use(initJWTStrategy());

console.log(path.resolve('./static'));
// serve static assets normally
app.use('/static/', express.static(path.resolve('./static')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false,
  }))

/* app.use(session({
    store: new appRedisStore({
      url: config.redisStore.url
    }),
    secret: config.redisStore.secret,
    resave: false,
    saveUninitialized: false
  }))
  */
  
app.use(passport.initialize())

//app.use(passport.session())

app.use('*', mainRouter);

const api = initApi(passport);

app.use('/api',function(req, res, next) {
    passport.authenticate('jwt', {session: false}, function(err, user, info) {
      if (err) { 
          return next(err); 
        }
      if (!user) { 
          return next();
        }
      req.logIn(user, function(err) {
        if (err) { 
            return next(err); 
        }
        else {
          return next();
        }
      });
    })(req, res, next);
  }, api); // load the router on '/api'



const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket, socket: WebSocket, request: http.IncomingMessage) => {
    //connection is up, let's add a simple simple event
    ws.on('message', (message: string) => {

        //log the received message and send it back to the client
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
    });

    ws.on('GET_DIALOGS', (requestBody: string) => {
        const data = JSON.parse(requestBody);
        getDialogs(data.userId, (userDialogs: any) => {
          ws.send(JSON.stringify(userDialogs));
        })
    });

    //send immediatly a feedback to the incoming connection    
    ws.send('Hi there, I am a WebSocket server');
});

//start our server
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started `);
});