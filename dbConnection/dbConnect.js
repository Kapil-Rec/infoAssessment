const mongoose = require('mongoose');
const dbName="info";
mongoose.connect(`mongodb://localhost:27017/${dbName}`, { useNewUrlParser: true}, (error, result) => {
    if (error) {
        console.log("Not Connected")
    } else {
        console.log("Database Connected")
    }
})