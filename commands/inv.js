const colors = require('../colors.json')
const Discord = require('discord.js');

module.exports = {
    name: "inv",

    async run (client, message, args) {
		let messageArry = message.content.split(" ")
		let cmd = messageArry[0]; 
		const inv = new Discord.MessageEmbed()
		.setColor(colors.main)
		.setTitle('Invite')
		.setDescription('**Support us by inviting DevEvilBot.xyz to your server :heart:** \n**[Click Here](https://discord.com/oauth2/authorize?client_id=743494327535140894&permissions=4294967295&redirect_uri=https%3A%2F%2Fdevevilbot.xyz%2Fdashboard&scope=bot%20applications.commands)**', true)
		.setThumbnail(client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
		message.channel.send(inv)
	}
}