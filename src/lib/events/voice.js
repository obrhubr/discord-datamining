const db = require("../db.js");

module.exports = {
	name: 'voiceStateUpdate',
	async execute(oldMember, newMember, messageclient) {
		let newUserChannel = newMember.channelID;
		let oldUserChannel = oldMember.channelID;
		if(newUserChannel != null) {
			var user = await messageclient.users.fetch(newMember.id);
			console.log(user.username + "#" + user.discriminator, "join");
			db.saveVoiceEvent({"event": "join", "username": user.username + "#" + user.discriminator, "timestamp": new Date()});
		} else if(oldUserChannel != null){
			var user = await messageclient.users.fetch(oldMember.id);
			console.log(user.username + "#" + user.discriminator, "leave");
			db.saveVoiceEvent({"event": "leave", "username": user.username + "#" + user.discriminator, "timestamp": new Date()});
		}
	},
};