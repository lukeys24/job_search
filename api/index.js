const express = require("express");
const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.json())

const port = 3001;

var redis = require('redis')
var client = redis.createClient();

const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);

app.get("/jobs", async (req, res) => {
    const response = await getAsync('github');
    console.log(response)
    res.send(response)
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
