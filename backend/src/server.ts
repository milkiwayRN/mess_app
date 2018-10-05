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
import { ESTABLISH_CONNECTION } from './constants/WebActionsTypes';
 
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

const webSocketID: any = {};
const userIds: any = {};

const api = initApi(passport, userIds, webSocketID);

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



function getUniqueID() {
  function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4();
};

interface IdWebSocket extends WebSocket {
    id?: string;
}

wss.on('connection', (ws: IdWebSocket, socket: WebSocket, request: http.IncomingMessage) => {
    //connection is up, let's add a simple simple event
    ws.id = getUniqueID();
    webSocketID[ws.id] = ws;

    ws.on('message', (message: string) => {

        //log the received message and send it back to the client
        console.log('received: %s', message);
        const action = JSON.parse(message);
        switch (action.type) {
          case ESTABLISH_CONNECTION:
            userIds[action.userId] = ws.id;
            ws.send(`connection establish, your id -> ${action.userId}`);
            break;
          default:
            ws.send('ERROR: CAN\'T DETERMINE ACTION');
        }
    });

    //send immediatly a feedback to the incoming connection    
    ws.send('Hi there, I am a WebSocket server');
});

//start our server
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started `);
});