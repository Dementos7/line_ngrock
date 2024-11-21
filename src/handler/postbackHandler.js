const { switchMethod } = require("../controller/user");
const { replyText } = require("./replyText");



const postbackHandler = async (replyToken, source, action) => {
    const userId = source.userId;
    let method = "standard";
    try {
        if (action === "action=standard") {
            method = "standard";
        } else if (action === "action=remainder") {
            method = "remainder";
        } else if (action === "action=linepay") {

        }
        const response = await switchMethod(userId, method);
        replyText(replyToken, `You are on ${method} method. \nPlease tell me what you want.`);
        return method;
    } catch (error) {
        console.log(error);
    }
}

module.exports = postbackHandler;