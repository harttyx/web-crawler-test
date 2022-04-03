const express = require("express");
const puppeteer = require("puppeteer");
const browserObject = require('./browser');
const scraperController = require('./pageController');
const cors = require("cors");

const app = express();
const port = 3000;


app.use(cors());

app.get("/crawl", async (req, res, next) => {
    let browserInstance = browserObject.startBrowser();

    scraperController(browserInstance,req, res);
});

app.use((req, res, next) => {
    res.status(404).send("No valid route found");
}) 

app.listen(port, (err) => {
    if (err) {
        console.log("Error while starting server")
    } else {
        console.log(`app is running on port: ${port}`);
    }
});