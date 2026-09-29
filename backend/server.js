require("dotenv").config();

const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const express = require("express");
const connectDB = require("./config/db");

const app = express();

app.use(express.json());

connectDB();

const port = 5000;

app.get("/", (req, res) => {
    res.json({
        message: "Edumatch API is working"
    });
});

app.listen(port, () => {
    console.log(`Edumatch backend is live ${port}`);
});