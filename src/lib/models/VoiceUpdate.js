const mongoose = require("mongoose");

const Message = mongoose.model("Message", { 
    username: String,
    event: String,
    timestamp: Date
});

exports.Message = Message; 