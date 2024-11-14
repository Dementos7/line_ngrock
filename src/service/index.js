// const { reminder } = require("./reminder");
const { standard } = require("./standard");

const service = async (message) => {
    return await standard(message.text);
}

module.exports = {
    service
}