const tmi = require('tmi.js');
const config = require('./config.json')

const client = new tmi.Client({
	options: { debug: true, messagesLogLevel: "info" },
	connection: {
		reconnect: true,
		secure: true
	},
	identity: {
		username: config.username,
		password: `oauth:${config.password}`
	},
	channels: config.channels
});


client.connect().catch(console.error);


client.on('message', (channel, tags, message, self) => {
	if(self || !message.startsWith('!')) return;

	const args = message.slice(1).split(' ');
	const command = args.shift().toLowerCase();

	if(command === 'github') {
		reply(channel, tags.username, "https://github.com/ko4jzt/crazycraftbot");
    }
    
    if(command === 'modpack') {
		reply(channel, tags.username, "http://voidswrath.com/modpacks/crazy-craft-4-0-official/ w/ morph mod");
    }
    
    if(command === 'friends') {
		reply(channel, tags.username, "https://pastebin.com/v19B6jm5");
    }
});

function reply(channel, username, message) {
    client.say(channel, `@${username}: ${message}`)
}