const checkNotNull = (input = "") => {
    if (input === "undefined" || input === null || input === undefined || input === "") {
        return false;
    }
    return true;
}

const checkAccess = (user, action, id = "") => {
    if (id === "") return user.access[action];
    else {
        return user.access[action] || user._id == id;
    }
}



module.exports = {
    checkNotNull,
    checkAccess,
};