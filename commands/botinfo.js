const colors = require('../colors.json')
const Discord = require('discord.js');

module.exports = {
    name: "botinfo",

    async run (client, message, args) {
		let messageArry = message.content.split(" ") 
		let cmd = messageArry[0];
		let botinfo = new Discord.MessageEmbed()
		.setColor(colors.main) 
		.setThumbnail(client.user.avatarURL({ format: "png", dynamic: true, size: 2048 }))
		.setTitle("Bot Info")
		.addField(`Bot Name`, `**${client.user.username}**`, true)
		.addField(`ID`, `**${client.user.id}**`)
		.addField(`Developer`, `**<@468132563714703390>**`)
		.addField(`Website`, `**[devevilbot.xyz](https://devevilbot.xyz)**`)
		.addField(`Server`, `**[Click Here](https://discord.gg/uQ7D3VCKmD)**`)
		.addField(`Discord.js Version`, `**${Discord.version}**`, true)
		.setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
		message.channel.send(botinfo)
	}
}