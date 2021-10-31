const colors = require('../colors.json')
const Discord = require('discord.js');

module.exports = {
    name: "server",

    async run (client, message, args) {
		if(message.author.bot || message.channel.type == "dm") return;
		let messageArry = message.content.split(" ")
		let cmd = messageArry[0]; 
		const server = new Discord.MessageEmbed()
		.setColor(colors.main)
		.setTitle('Server')
		.addField('Support Server', '**[Click Here](https://discord.gg/jsQ9UP7kCA)**', true)
		.setThumbnail(client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
		message.channel.send(server)
	}
}