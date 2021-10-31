const color = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db')
const { token, default_prefix } = require('../config.json');

module.exports = {
    name: "ml",

    async run (client, message, args) {
		let money = db.all().filter(data => data.ID.startsWith(`money`)).sort((a, b) => b.data - a.data)
		money.length = 10;
		var finalLb = "";
		for (var i in money) {
		  finalLb += `**${money.indexOf(money[i])+1}. <@${client.users.cache.get(money[i].ID.split('_')[1]) ? client.users.cache.get(money[i].ID.split('_')[1]).id : "Unknown User#0000"}>** - **${money[i].data}** <:DevEvilBot_Coin:867679208855437333>\n`;
		}
		const embed = new Discord.MessageEmbed()
		.setTitle(`Money Leaderboard`, message.guild.iconURL())
		.setColor(color.main)
		.setDescription(`${finalLb}`)
		.setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
		.setTimestamp()
		message.channel.send(embed);
	}
}
