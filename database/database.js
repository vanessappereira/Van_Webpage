const mongoose = require("mongoose")
const { MONGODB_URL } = process.env

exports.connect(MONGODB_URL, {
    useNewUrlParser:true, 
    useUnifiedTopology:true
})
    .then()
    .catch((error) => {
        console.log('DB connection Failed');
        console.log(error);
        process.exit(1)
    })