// mongoose schema for notes is defined in models/Notes.js:
const mongoose = require('mongoose'); 
// destructuring mongoose.Schema to Schema
const { Schema } = mongoose;

// Schema for notes 
const NotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: "General"  // default value
    },
    date: {
        type: Date,
        defualt: new Date()
    }
})
// Exporting NotesSchema to routes/notes.js 
module.exports = mongoose.model("notes", NotesSchema);


