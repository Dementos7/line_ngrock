
const users = {};

const reminderWorkflow = (message , userId) => {
    return checkStep(message , userId) == 1 
    ? "Please tell me when you want the data"
    : "I will remaind you in time";
    
}

const checkStep = (message , userId) => {
    if(Object.keys(users).includes(userId)){
        users[userId].cron = message;
        console.log("step 2");
        return 2;
    }else{
        users[userId] = {
            "question": message,
            "cron": ""
        };
        console.log("New user added");
        return 1;
    }
}

module.exports = reminderWorkflow;