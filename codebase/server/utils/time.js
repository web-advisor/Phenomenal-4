const moment = require("moment");

const timing = (timestring) => {
    let hours = "";
    let minutes = "";
    let l = timestring.length;
    let found = false;
    for (let i = 0; i < l; i++) {
        if (timestring[i] >= '0' && timestring[i] <= '9') {
            if (!found) {
                hours += timestring[i];
            } else {
                minutes += timestring[i];
            }
        } else if (timestring[i] == ':') {
            found = true;
        }
    }

    if (!found) return convertToEpoch(0);
    else {
        return convertToEpoch(hours + ":" + minutes);
    }
}


const convertToEpoch = (time, date = 0) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0') + date;
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    var completeTime = today + " " + time + 330;
    var format = "M/D/YYYY H:mm";
    const epoch = moment(completeTime, format).valueOf();
    return parseInt(epoch);
}


const computeCurrMinutes = () => {
    return Date.now();
}
// 1662663220540 1662701400000 1662723000000 1662720900000

const computeAppointment = (curr, lower, upper, latest) => {
    if (latest.length < 6) {
        latest = timing(latest);
    } else {
        latest = parseInt(latest);
    }

    var time = 0;
    if (curr + (10 * 60 * 1000) > upper) {
        lower = lower + (24 * 60 * 60 * 1000);
        time = latest >= lower ? latest + (15 * 60 * 1000) : lower;
    } else if (curr < lower) {
        time = latest >= lower ? latest + (15 * 60 * 1000) : lower;
    } else {
        if (curr + (10 * 60 * 1000) < latest + (15 * 60 * 1000))
            time = latest + (15 * 60 * 1000);
        else
            time = curr + (10 * 60 * 1000);
    }
    console.log(curr, lower, upper, latest);
    return time;
}


module.exports = {
    timing,
    computeCurrMinutes,
    computeAppointment,
    convertToEpoch
}