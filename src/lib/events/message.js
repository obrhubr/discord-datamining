const db = require("../db.js");

module.exports = {
	name: 'message',
	execute(message) {
		console.log(`${message.author.tag} in #${message.channel.name} sent: ${message.content}`);
		db.saveMessage({"username": message.author.tag, "content": message.content  ,"length": message.content.length, "timestamp": new Date()});
		return;
	},
};