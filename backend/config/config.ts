interface RedisStoreConfig {
  url: any;
  secret: any;
}

interface Config {
  redisStore: RedisStoreConfig;
  JWTSecret: string,
}
const args = require("args-parser")(process.argv);

// this was written just for development purpose.
// set up this in ENV variables for real project usage
const config: Config = {
  redisStore: {
    url: args.REDIS_STORE_URI,
    secret: args.REDIS_STORE_SECRET,
  },
  JWTSecret: 'my-jwt-secret'
};


export default config;