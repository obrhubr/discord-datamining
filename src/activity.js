require('dotenv').config();
const Discord = require('discord.js');

const myIntents = new Discord.Intents();
myIntents.add('GUILD_PRESENCES', 'GUILD_MEMBERS');
const activityclient = new Discord.Client({ ws: { intents: new Discord.Intents(Discord.Intents.ALL) }});

const TOKEN1 = process.env.TOKEN1;
const events = require("./lib/events.js");

activityclient.on('ready', async () => {
	console.info(`Activity Client logged in as ${activityclient.user.tag}!`);

	//set interval fort status detection
	console.log('setting interval');
	let timer = setInterval(async function() {
		events.saveStatus(activityclient)
	}, 1000*60*5);
});

activityclient.login(TOKEN1);