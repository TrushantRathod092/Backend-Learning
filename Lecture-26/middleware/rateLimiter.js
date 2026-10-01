const redisClient = require("../config/redis");

const windowSize = 3600; // 3600sec = 60min
const maxRequest = 60;

// Default Window

// const rateLimiter = async(req, res, next) => {
//     try {
//         const ip = req.ip;
//        // console.log(ip);
        
//         const count = await redisClient.incr(ip);

//         if(count > 15){
//             return res.status(429).send("User Limit Exceeded");
//         }

//         if(count == 1){
//             redisClient.expire(ip, 3600); // 3600sec = 1hr
//         }

//     // console.log(count);
        
//         next();
//     } catch (error) {
//         res.status(500).send("Error: " + error.message);
//     }
// }


// Sliding Window

const rateLimiter = async(req, res, next) => {
    try {
        const key = `IP${req.ip}`;
        // console.log(ip);
        const currentTime = Date.now() / 1000; 
        // Date.now() gives time in millisec, to convert it in sec 
        // Date.now()/1000 is there

        const windowTime = currentTime - windowSize;
        // if currentTime is 1:20(calculated in sec) and windowSize is given i.e. 60min(3600sec) so windowTime = 12:20 so remove all before 12:20
        
        await redisClient.zRemRangeByScore(key, 0, windowTime);

        const numberOfRequest = await redisClient.zCard(key);

        if(numberOfRequest >= maxRequest){
            throw new Error("Number of request exceeded");
        }

        await redisClient.zAdd(key, [{score: currentTime, value: `${currentTime}: ${Math.random()}`}])
        
        await redisClient.expire(key, windowSize);

        next();
    } catch (error) {
        res.status(500).send("Error: " + error.message);
    }
}

module.exports = rateLimiter;