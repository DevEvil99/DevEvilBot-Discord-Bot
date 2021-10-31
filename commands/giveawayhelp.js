const colors = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db');
const { token, default_prefix } = require('../config.json');

module.exports = {
    name: "gahelp",

    async run (client, message, args) {
		let prefix = await db.get(`prefix_${message.guild.id}`);
		if(prefix === null) prefix = default_prefix;
		const page1 = new Discord.MessageEmbed()
		 .setTitle('Giveaway')
		 .addField('Starts a giveaway', `\`${prefix}giveaway <channel> <duration> <number of winners> <prize>\``, true)
		 .addField('Ends the giveaway', `\`${prefix}end-ga <giveaway message ID>\``, true)
		 .addField('Reroll', `\`${prefix}reroll <giveaway message ID>\``, true)
		 .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
		 .setColor(colors.main)
		 message.channel.send(page1)
	}
} 