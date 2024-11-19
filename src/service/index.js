// const { reminder } = require("./reminder");
const { standard } = require("./standard");



exports.service = async (message) => {
    return standard(message.text);
}

