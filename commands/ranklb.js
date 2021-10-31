const colors = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db')

module.exports = {
    name: "ranklb",

    async run (client, message, args) {
		let lbMessage = db.all().filter(data => data.ID.startsWith(`messages_${message.guild.id}`)).sort((a, b) => b.data - a.data)
		lbMessage.length = 10;
		var finalLb = ""
  
		for (var i in lbMessage) {
			finalLb += `${lbMessage.indexOf(lbMessage[i])+1}. <@${message.client.users.cache.get(lbMessage[i].ID.split('_')[2]) ? message.client.users.cache.get(lbMessage[i].ID.split('_')[2]).id : "Unknown User#0000"}> ${lbMessage[i].data}\n`;
		}
		const embed = new Discord.MessageEmbed()
			.setAuthor(`${message.guild.name}'s Message Leaderboard`)
			.setColor(colors.main)
			.setDescription(`**${finalLb}**`)
			.setFooter(message.client.user.username, message.client.user.displayAvatarURL())
			.setTimestamp()
		message.channel.send(embed);
	}
}