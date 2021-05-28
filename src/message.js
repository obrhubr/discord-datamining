require('dotenv').config();
const Discord = require('discord.js');
const messageclient = new Discord.Client();

const TOKEN2 = process.env.TOKEN2;
const fs = require("fs");

const db = require("./lib/db.js");

// Load events
const eventFiles = fs.readdirSync('./src/lib/events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./lib/events/${file}`);
	if (event.once) {
		messageclient.once(event.name, (...args) => event.execute(...args, messageclient));
	} else {
		messageclient.on(event.name, (...args) => event.execute(...args, messageclient));
	}
}

messageclient.on('ready', async () => {
	console.info(`Message Client logged in as ${messageclient.user.tag}!`);
});

messageclient.login(TOKEN2);