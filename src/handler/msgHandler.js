const { service } = require('../service');
const { replyText } = require('./replyText');


exports.handleText = async (message, replyToken) => {
    const response = await service(message);
    return replyText(replyToken, response, message.quoteToken);
  }
  
exports.handleImage = (message, replyToken) => {
    return replyText(replyToken, 'Got Image');
  }
  
exports.handleVideo = (message, replyToken) => {
    return replyText(replyToken, 'Got Video');
  }
  
exports.handleAudio = (message, replyToken) => {
    return replyText(replyToken, 'Got Audio');
  }
  
exports.handleLocation = (message, replyToken) => {
    return replyText(replyToken, 'Got Location');
  }
  
exports.handleSticker = (message, replyToken) => {
    return replyText(replyToken, 'Got Sticker');
  }

  
  

