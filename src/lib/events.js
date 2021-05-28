const db = require("./db.js");

async function saveStatus(bot) {
    var server = bot.guilds.cache.get("776383413539438594");
    var members = await server.members.fetch();
    //get status and game
    members.forEach(async (member) => {
        await db.addUserData({"username": member.user.username, "status": member.user.presence.status, "timestamp": new Date()});
        if(member.user.presence.hasOwnProperty("activities") && member.user.presence.activities.length > 0) {
            if(member.user.presence.activities[0].hasOwnProperty("name")) {
                await db.addUserGame({"username": member.user.username, "game": member.user.presence.activities[0].name, "timestamp": new Date()});
            }
        }
	})

    return;
}

module.exports = {saveStatus}