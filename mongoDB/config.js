const mongoose = require("mongoose");
require('dotenv').config();

const connect = (uri) => {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(res => console.log(`Connection MangoDB Successful...`))
        .catch(err => console.log(`Error in MangoDB connection >> ${err}`));
}

module.exports = connect(process.env.MONGO_URI);    