const redisClient = require("../config/redis");

const rateLimiter = async(req, res, next) => {
    try {
        const ip = req.ip;
        console.log(ip);
        
        const count = await redisClient.incr(ip);

        if(count > 15){
            return res.status(429).send("User Limit Exceeded");
        }

        if(count == 1){
            redisClient.expire(ip, 3600); // 3600sec = 1hr
        }

        console.log(count);
        
        next();
    } catch (error) {
        res.status(500).send("Error: " + error.message);
    }
}

module.exports = rateLimiter;