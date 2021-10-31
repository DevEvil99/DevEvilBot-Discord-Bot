let Discord = require("discord.js");
const noodles_api = require('noodles-wrapper')

module.exports = {
	name: "clown",
	description: "Make a clown",
	run: async (client, message, args) => {
	
	let user = message.mentions.users.first() || message.author
	let result = user.displayAvatarURL()
	
	let Image = await  noodles_api.clown(result)
	
	const attachment = new Discord.MessageAttachment(Image, "clown.js");
	message.channel.send(attachment);
	}
};