const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Number
    },
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Subinfo", subSchema); 