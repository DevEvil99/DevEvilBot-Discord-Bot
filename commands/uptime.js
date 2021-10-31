const color = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db')
const { token, default_prefix } = require('../config.json');

module.exports = {
    name: "uptime",

    async run (client, message, args) {
		let days = Math.floor(client.uptime / 86400000);
		let hours = Math.floor(client.uptime / 3600000) % 24;
		let minutes = Math.floor(client.uptime / 60000) % 60;
		let seconds = Math.floor(client.uptime / 1000) % 60;

		const uptimeembed = new Discord.MessageEmbed()
		.setTitle('Uptime')
		.setDescription(`**Normal bot uptime is more than a week, if the bot uptime was less than a week, it means that a new update has come for the bot or its bugs have been fixed, For more details join our [support server](https://discord.gg/jsQ9UP7kCA)** \n**My uptime is ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} second**`)
		.setColor(color.main)
		.setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
		message.channel.send(uptimeembed)
	}
}