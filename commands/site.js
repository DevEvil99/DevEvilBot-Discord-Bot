const colors = require('../colors.json')
const Discord = require('discord.js');

module.exports = {
    name: "site",

    async run (client, message, args) {
		let messageArry = message.content.split(" ")
		let cmd = messageArry[0]; 
		const server = new Discord.MessageEmbed()
		.setColor(colors.main)
		.setTitle('Website')
		.setDescription('**[Click Here](https://devevilbot.xyz)**')
		.setThumbnail(client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
		message.channel.send(server)
	}
}