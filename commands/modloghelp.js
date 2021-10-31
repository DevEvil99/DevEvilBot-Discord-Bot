const colors = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db');
const { token, default_prefix } = require('../config.json');
module.exports = {
    name: "modlog",

    async run (client, message, args) {
		let prefix = await db.get(`prefix_${message.guild.id}`);
		if(prefix === null) prefix = default_prefix;
		const modlog = new Discord.MessageEmbed()
		.setTitle('Moderation Log')
		.addField('Set Log', `\`${prefix}setmodlog <channel>\``, true)
		.addField('Disable Log', `\`${prefix}disablemodlog\``, true)
		.setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
		.setColor(colors.main)
		message.channel.send(modlog)
	}
} 