const redis = require("redis");
require("dotenv").config();

const redisClient = redis.createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: 'supersafe-magentaish-flower-33918.db.redis.io',
        port: 14157
    }
})

// const connectRedis = async () =>{
//     await redisClient.connect();
//     console.log("Connected to Redis");
// }

// connectRedis();

module.exports = redisClient;