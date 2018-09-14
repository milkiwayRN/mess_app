"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const passport = require("passport");
const session = require("express-session");
const RedisStore = require("connect-redis");
const path = require("path");
const bodyParser = require("body-parser");
const MainRouter_1 = require("./routers/MainRouter");
const init_1 = require("./authentication/init");
const config_1 = require("../config/config");
const ApiRouter_1 = require("./routers/ApiRouter");
const appRedisStore = RedisStore(session);
const app = express();
passport.use(init_1.default());
console.log(path.resolve('./static'));
// serve static assets normally
app.use('/static/', express.static(path.resolve('./static')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false,
}));
app.use(session({
    store: new appRedisStore({
        url: config_1.default.redisStore.url
    }),
    secret: config_1.default.redisStore.secret,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('*', MainRouter_1.default);
const api = ApiRouter_1.default(passport);
app.use('/api', api); // load the router on '/api'
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
wss.on('connection', (ws) => {
    //connection is up, let's add a simple simple event
    ws.on('message', (message) => {
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
//# sourceMappingURL=server.js.map