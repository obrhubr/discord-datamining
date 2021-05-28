const mongoose = require("mongoose");

const UserData = mongoose.model("UserData", { 
    username: String,
    status: String,
    timestamp: Date
});

exports.UserData = UserData; 