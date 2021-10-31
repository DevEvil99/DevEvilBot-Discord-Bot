const colors = require('../colors.json')
const Discord = require('discord.js');

module.exports = {
    name: "about",

    async run (client, message, args) {
		let messageArry = message.content.split(" ")
		let cmd = messageArry[0]; 
		const about = new Discord.MessageEmbed()
		.setTitle('About')
		.setDescription('**DevEvil.xyz is a multifunctional bot that simplifies server management, Created by DevEvil#8745**\n**Also features Games , Fun , NSFW and much more**')
		.setThumbnail(client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
		.setColor(colors.main)
		message.channel.send(about)
	}
}