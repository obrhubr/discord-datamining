const mongoose = require("mongoose");

const UserDataStorage = mongoose.model("UserDataStorage", { 
    username: String,
    status: String,
    timestamp: Date
});

exports.UserDataStorage = UserDataStorage; 