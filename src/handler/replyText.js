const line = require('@line/bot-sdk');

const config = {
    port : process.env.port,
    channelAccessToken: process.env.channelAccessToken,
    channelSecret: process.env.channelSecret
  }

  
const client = new line.messagingApi.MessagingApiClient(config);

exports.replyText = (replyToken, text, quoteToken) => {
    return client.replyMessage({
      replyToken,
      messages: [{
        type: 'text',
        text,
        quoteToken
      }]
    });
  };