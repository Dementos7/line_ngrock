const { handleText } = require('./msgHandler');
const { replyText } = require('./replyText');
const { addUser, destroyUser } = require('../controller/user');
const postbackHandler = require('./postbackHandler');

// callback function to handle a single event
exports.handleEvent = async (event) => {
    console.log("event : ", event, "\n" );
    switch (event.type) {
      case 'message':
        const message = event.message;
        console.log(event.replyToken);
        switch (message.type) {
          case 'text':
            return await handleText(message, event.source.userId, event.replyToken);
          default:
            throw new Error(`Unknown message: ${JSON.stringify(message)}`);
        }
  
      case 'follow':
        const responseText = await addUser(event.source);
        return replyText(event.replyToken, responseText);
  
      case 'unfollow':
        await destroyUser(event.source);
        return console.log(`Unfollowed this bot: ${JSON.stringify(event)}`);

      case 'postback':
          let data = event.postback.data;
          await postbackHandler(event.replyToken, event.source, data);
          console.log("postback", data);
          return true;
      default:
        throw new Error(`Unknown event: ${JSON.stringify(event)}`);
    }
  }
