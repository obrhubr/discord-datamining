const mongoose = require("mongoose");

const Message = mongoose.model("Message", { 
    username: String,
    length: String,
    timestamp: Date
});

exports.Message = Message; 