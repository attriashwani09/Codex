const { createClient } = require('redis');

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_KEY,
    socket: {
        host: 'water-look-sleek-26341.db.redis.io',
        port: 10824
    }
});  


module.exports = redisClient ;