const { getUserdataForValidate } = require('../controller/user');
const User = require('../model/user_model');
const validate = require('../script/validate');
const { service } = require('../service');
const { replyText } = require('./replyText');


exports.handleText = async (message, userId, replyToken) => {
  var responseText = "";
  const user = await getUserdataForValidate(userId);
  const isValid = validate(user);
  console.log(isValid);
  if (isValid.available) {
    responseText = await service(message, user);
  } else {
    if (user.method === "standard") {
      responseText = "You are out of Standard method for Today";
    } else {
      responseText = "You are limit of reminder method. \n Switch to Standard method";
    }
  }
  console.log("response", responseText);
  return replyText(replyToken, responseText, message.quoteToken);
}
