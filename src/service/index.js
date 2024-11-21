// const { reminder } = require("./reminder");
const standard = require("./standard");
const reminderWorkflow = require('./reminder_workflow');
const { getHistory, updateHistory } = require("../controller/user");

exports.service = async (message, user) => {
    console.log("Service");
    if (user.method == 'standard') {
        const history = await getHistory(user.userId);
        console.log('history', history.history);
        const response = await standard(message.text, history.history);
        let uploadData = [...history.history,
            `User: ${message.text}\n Assistant: ${response}`].slice(-10);
        console.log(uploadData);
        updateHistory(user.userId, uploadData);
        return response;
    }
    else
        return reminderWorkflow(message.text, user.userId);
}

