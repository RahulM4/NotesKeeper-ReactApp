const mongoose = require('mongoose');
const mongoUri = "mongodb://127.0.0.1:27017/noteskeeper";

mongoose.set("strictQuery", false);
const connecttoMongo = () => {
    mongoose.connect(mongoUri, ()=> {
    console.log("Connected to MongoDB Successfully!");
   });
}


module.exports = connecttoMongo;