//const mongoose = require("mongoose");

/* console.log(`Connecting to mongodb at url: ${`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@db:27017/flashcards?authSource=admin`}`);
mongoose.connect(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@db:27017/flashcards?authSource=admin`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}); */
const admin = require('firebase-admin');
//const serviceAccount = require('../../key.json');

/* admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore(); */
admin.initializeApp({
    credential: admin.credential.applicationDefault()
});

const db = admin.firestore();

/* admin.initializeApp({
    credential: admin.credential.applicationDefault()
});
  
const db = admin.firestore(); */

/* const { UserData } = require("./models/UserData.js");
const { UserDataStorage } = require("./models/UserDataStorage.js");
const { Message } = require("./models/Message.js"); */

const collectionStatus = db.collection('discord-status');
const collectionGame = db.collection('discord-game');
const collectionMessage = db.collection('discord-message');
const collectionVoice = db.collection('discord-voice');

async function saveMessage(message) {
    //let data = new Message({ message });
    //await data.save();
    await collectionMessage.doc(message.username+"_"+message.timestamp).set(message);
    return;
}

async function saveVoiceEvent(event) {
    //let data = new Message({ message });
    //await data.save();
    await collectionVoice.doc(event.username+"_"+event.timestamp).set(event);
    return;
}

async function addUserData(userdata) {
    /* let data = new UserData({ userdata });
    await data.save(); */
    await collectionStatus.doc(userdata.username+"_"+userdata.timestamp).set(userdata);
    return;
    
}

async function addUserGame(userdata) {
    /* let data = new UserData({ userdata });
    await data.save(); */
    await collectionGame.doc(userdata.username+"_"+userdata.timestamp).set(userdata);
    return;
    
}

module.exports = {addUserData, saveMessage, saveVoiceEvent, addUserGame};