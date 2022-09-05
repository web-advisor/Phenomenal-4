var mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;
const url = `${MONGO_URI}?retryWrites=true&w=majority`;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connection Successful")).catch((e) => console.log(e));

