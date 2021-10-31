const colors = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db');
const { token, default_prefix } = require('../config.json');

module.exports = {
    name: "leavehelp",

    async run (client, message, args) {
		let prefix = await db.get(`prefix_${message.guild.id}`);
		if(prefix === null) prefix = default_prefix;
		const page1 = new Discord.MessageEmbed()
		 .setTitle('Leave Message')
		 .addField('Set a leave channel', `\`${prefix}setleave <channel>\``, true)
		 .addField('Set a leave message', `\`${prefix}leavemsg-help (Important, read this)\``, true)
		 .addField('Reset leave channel', `\`${prefix}resetleave\``, true)
		 .addField('Reset leave message', `\`${prefix}resetleavemsg\``, true)
		 .addFields(
			{ name: '▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬', value: '**Leave message only with text**' },
			{ name: 'Set a text leave channel', value: `\`${prefix}settextleave <channel>\``, inline: true },
			{ name: 'Set a text leave message', value: `\`${prefix}textleavemsg-help (Important, read this)\``, inline: true },
			{ name: 'Reset text leave channel', value: `\`${prefix}resettextleave\``, inline: true },
			{ name: 'Reset text leave message', value: `\`${prefix}resettextleave-msg\``, inline: true },
		)
		 .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
		 .setColor(colors.main)
		 message.channel.send(page1)
	}
}