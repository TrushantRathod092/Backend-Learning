const express = require("express")
const app = express()
const main = require("./aiChatting")

app.use(express.json());

const chattingHistory = {};

app.post('/chat', async(req, res) => {
    // const {msg} = req.body;
    // const answer = await main(msg);
    // res.send(answer);

    const {msg, id} = req.body;

    if (!msg || id === undefined) {
        return res.status(400).send("msg and id are required");
    }

    const previousInteractionId = chattingHistory[id];
    const result = await main(msg, previousInteractionId);
    chattingHistory[id] = result.interactionId;

    res.send(result.answer);
})

app.listen(3000, () => {
    console.log("Server is running at port 3000");
})