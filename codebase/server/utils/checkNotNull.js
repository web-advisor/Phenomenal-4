const checkNotNull = (input = "") => {
    if(input === "undefined" || input === null || input === undefined || input === ""){
        return false;
    }
    return true;
}

module.exports  = {
    checkNotNull
};