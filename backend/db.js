const mongoose = require('mongoose');
const mongoUri = "mongodb+srv://rahulrps447:rahulrps447@cluster0.pjjrtyv.mongodb.net/NotesKeeper";

mongoose.set("strictQuery", false);
const connecttoMongo = () => {
    mongoose.connect(mongoUri, ()=> {
    console.log("Connected to MongoDB Successfully!");
   });
}


module.exports = connecttoMongo;