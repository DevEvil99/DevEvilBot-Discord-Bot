let Discord = require("discord.js");
const noodles_api = require('noodles-wrapper')

module.exports = {
	name: "rip",
	run: async (client, message, args) => {
	let user = message.mentions.users.first() || message.author
	let result = user.displayAvatarURL()
	
	let Image = await  noodles_api.rip(result)
	
	const attachment = new Discord.MessageAttachment(Image, "R.I.P.png");
	message.channel.send(attachment);
	}
};