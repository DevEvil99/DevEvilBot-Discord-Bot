const colors = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db');
const { token, default_prefix } = require('../config.json');
module.exports = {
    name: "economy",

    async run (client, message, args) {
		let prefix = await db.get(`prefix_${message.guild.id}`);
		if(prefix === null) prefix = default_prefix;
		const crr = new Discord.MessageEmbed()
		.setTitle('Economy Commands')
		.addField('Shop', `\`${prefix}shop\``, true)
		.addField('Buy', `\`${prefix}buy <item>\``, true)
		.addField('Daily', `\`${prefix}daily\``, true)
		.addField('Weekly', `\`${prefix}weekly\``, true)
		.addField('Monthly', `\`${prefix}monthly\``, true)
		.addField('Work', `\`${prefix}work bodyguard | constructor | programmer\``, true)
		.addField('Rob', `\`${prefix}rob\``, true)
		.addField('Add Money <a:premium:886151535271219240>', `\`${prefix}add-money <amount> <user>\``, true)
		.addField('Remove Money <a:premium:886151535271219240>', `\`${prefix}remove-money <amount> <user>\``, true)
		.addField('Roulette', `\`${prefix}roulette\``, true)
		.addField('Gamble', `\`${prefix}gamble\``, true)
		.addField('Lottery', `\`${prefix}lottery\``, true)
		.addField('Balance', `\`${prefix}balance\``, true)
		.addField('Leaderboard', `\`${prefix}ml\``, true)
		.setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
		.setColor(colors.main)
		message.channel.send(crr)
	}
} 