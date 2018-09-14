import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import * as passport from 'passport';
import * as session from 'express-session';
import * as RedisStore from 'connect-redis';
import * as path from 'path';
import * as bodyParser from 'body-parser';

import mainRouter from './routers/MainRouter';
import initPassportStrategy from './authentication/init';
import config from '../config/config';
import authenticationMiddleware from './authentication/middleware';
import initApi from './routers/ApiRouter';
const appRedisStore = RedisStore(session);

const app = express();

passport.use(initPassportStrategy());

console.log(path.resolve('./static'));
// serve static assets normally
app.use('/static/', express.static(path.resolve('./static')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false,
  }))

app.use(session({
    store: new appRedisStore({
      url: config.redisStore.url
    }),
    secret: config.redisStore.secret,
    resave: false,
    saveUninitialized: false
  }))
  
app.use(passport.initialize())

app.use(passport.session())

app.use('*', mainRouter);

const api = initApi(passport);

app.use('/api', api); // load the router on '/api'

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket) => {

    //connection is up, let's add a simple simple event
    ws.on('message', (message: string) => {

        //log the received message and send it back to the client
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
    });

    //send immediatly a feedback to the incoming connection    
    ws.send('Hi there, I am a WebSocket server');
});

//start our server
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started `);
});