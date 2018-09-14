interface RedisStoreConfig {
  url: any;
  secret: any;
}

interface Config {
  redisStore: RedisStoreConfig;
}
const args = require("args-parser")(process.argv);

console.log(args.REDIS_STORE_URI);
console.log(args.REDIS_STORE_SECRET);

const config: Config = {
  redisStore: {
    url: args.REDIS_STORE_URI,
    secret: args.REDIS_STORE_SECRET,
  },
};


export default config;