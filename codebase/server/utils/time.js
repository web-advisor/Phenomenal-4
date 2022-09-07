const timing = (timestring) => {
    let hours = "";
    let minutes = "";
    let l = timestring.length;
    let found = false;
    for(let i=0; i<l; i++){
        if(timestring[i] >= '0' && timestring[i] <= '9'){
            if(!found){
                hours += timestring[i];
            }else{
                minutes += timestring[i];
            }
        }else if(timestring[i] == ':'){
            found = true;
        }
    }

    if(!found) return 0;
    else{
        let h = parseInt(hours);
        let m = parseInt(minutes);
        const time = h * 60 + m;
        return time;
    }
}

const computeMinutes = () => {
    var now = new Date();
    var hours = now.getHours;
    var minutes = now.getMinutes;
    const time = hours * 60 + minutes;
    return time;
}


const computeAppointment = (curr, lower, upper, latest) => {
    var input 
}


module.exports = {
    timing,
    computeMinutes,
    computeAppointment
}