const { replyText } = require("../handler/replyText");
const User = require("../model/user_model");

exports.addUser = async (source) => {
    try {
        const user = new User({
            userId: source.userId,
        });
        await user.save();
        return "You are on Standard";
    }
    catch (error) {
        console.log("other error", error);
        return "there is some problem with you.";
    }
}

exports.destroyUser = async (source) => {
    try {
        // Corrected filter and proper handling of async function.
        const user = await User.findOneAndUpdate(
            { userId: source.userId, unfollowed: null }, // Corrected from 'unfollowd' to 'unfollowed'
            { unfollowed: new Date() },
            { new: true, runValidators: true }
        );

        // Check if user was found and updated
        if (user) {
            console.log(user.userId); // Accessing userId if the user exists
        } else {
            console.log('No user found with the specified criteria.');
        }
    } catch (error) {
        console.error('Error updating the user:', error);
    }
}

exports.switchMethod = async (userId , action) => {
    try {
        // Corrected filter and proper handling of async function.
        const user = await User.findOneAndUpdate(
            { userId: userId, unfollowed: null }, // Corrected from 'unfollowd' to 'unfollowed'
            { method: action },
            { new: true, runValidators: true }
        );

        // Check if user was found and updated
        if (user) {
            console.log(user.userId); // Accessing userId if the user exists
            return true;
        } else {
            console.log('Please try again after a few minutes.');
            return false;
        }
    } catch (error) {
        console.error('Error updating the user:', error);
        return false;
    }
}

exports.addCron = async (source) => {
    try {
        const user = User.findOneAndUpdate(
            { userId: source.userId, unfollowd: null }, 
            { unfollowd: Date.now() }
        ); 
        console.log(user);
    }
    catch (error) {
        console.log("other error", error);
    }
}

exports.getUserdataForValidate = (userId) => {
    return User.findOne(
        { userId: userId, unfollowed: null },
        'userId method payed cron_num standard last_asked').exec();
}

exports.getHistory = async (userId) => {
    const res = await User.findOne(
        { userId: userId , unfollowed: null},
        'history'
    ).exec();
    console.log("gethistory", res);
    return res;
}

exports.updateHistory = async (userId, history) => {
    const res = User.findOneAndUpdate(
        { userId: userId , unfollowed: null},
        { history : history }
    ).exec();
    return res;
}