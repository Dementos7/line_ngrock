const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
};

const validate = (user) => {
    let payed = false;
    let available = false;
    if (new Date(user.payed) > new Date()) {
        payed = true;
    }
    if (payed) {
        if (user.method === 'standard') {
            available = true;
        } else {
            available = user.cron_num < process.env.cron_num;
        }
    } else {
        if (user.method === 'standard') {
            available = isToday(user.last_asked.date)
            ? user.last_asked.num < process.env.cron_limit
            : true;
        } else {
            available = user.cron_num == 0
        }
    }
    return {
        available : available,
        payed : payed,
        today : isToday(user.last_asked.date)
    };
}

module.exports = validate;