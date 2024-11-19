'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const dotenv = require('dotenv');
const db = require("./src/db");
const { handleEvent } = require("./src/handler/eventHandler");
dotenv.config();
db.connectToDatabase();

const port = process.env.port;
const config = {
  port : process.env.port,
  channelAccessToken: process.env.channelAccessToken,
  channelSecret: process.env.channelSecret
}


const app = express();

// webhook callback
app.post('/webhook', line.middleware(config), (req, res) => {
  // req.body.events should be an array of events
  if (!Array.isArray(req.body.events)) {
    return res.status(500).end();
  }
  // handle events separately
  Promise.all(req.body.events.map(event => {
    console.log('event', event);
    return handleEvent(event);
  }))
    .then(() => res.end())
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
