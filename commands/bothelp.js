const colors = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db');
const { token, default_prefix } = require('../config.json');
module.exports = {
    name: "bot",

    async run (client, message, args) {
		let prefix = await db.get(`prefix_${message.guild.id}`);
		if(prefix === null) prefix = default_prefix;
		const bot = new Discord.MessageEmbed()
		.setTitle('Bot Info Commands')
		.addField('Invite', `\`${prefix}inv\``, true)
		.addField('Support Server', `\`${prefix}server\``, true)
		.addField('Website', `\`${prefix}site\``, true)
		.addField('Upvote', `\`${prefix}upvote\``, true)
		.addField('About Bot', `\`${prefix}about\``, true)
		.addField('Change Prefix', `\`${prefix}prefix <prefix>\``, true)
		.addField('Bot Info', `\`${prefix}botinfo\``, true)
		.addField('Bot Stats', `\`${prefix}stats\``, true)
		.setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
		.setColor(colors.main)
		message.channel.send(bot)
	}
} 