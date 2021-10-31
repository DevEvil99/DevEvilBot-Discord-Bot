const colors = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db');
const { token, default_prefix } = require('../config.json');

module.exports = {
    name: "wlchelp",

    async run (client, message, args) {
		let prefix = await db.get(`prefix_${message.guild.id}`);
		if(prefix === null) prefix = default_prefix;
		const page1 = new Discord.MessageEmbed()
		 .setTitle('Welcome Message')
		 .addField('Set a welcome channel', `\`${prefix}setwlc <channel>\``, true)
		 .addField('Set a welcome message', `\`${prefix}wlcmsg-help (Important, read this)\``, true)
		 .addField('Set a welcome image', `\`${prefix}setwlcimg <image url>\``, true)
		 .addField('Reset welcome channel', `\`${prefix}resetwlc\``, true)
		 .addField('Reset welcome message', `\`${prefix}resetwlcmsg\``, true)
		 .addField('Reset welcome image', `\`${prefix}resetwlcimg\``, true)
		 .addFields(
			{ name: '▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬', value: '**Welcome message with embed**' },
			{ name: 'Set a embed welcome channel', value: `\`${prefix}setwlc-embed <channel>\``, inline: true },
			{ name: 'Set a embed welcome message', value: `\`${prefix}wlcmsg-embed-help (Important, read this)\``, inline: true },
			{ name: 'Reset embed welcome channel', value: `\`${prefix}resetwlc-embed\``, inline: true },
			{ name: 'Reset embed welcome message', value: `\`${prefix}resetwlcmsg-embed\``, inline: true },
		)
		.addFields(
			{ name: '▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬', value: '**Welcome message only with text**' },
			{ name: 'Set a text welcome channel', value: `\`${prefix}settextwlc <channel>\``, inline: true },
			{ name: 'Set a text welcome message', value: `\`${prefix}textwlcmsg-help (Important, read this)\``, inline: true },
			{ name: 'Reset text welcome channel', value: `\`${prefix}resettext-wlc\``, inline: true },
			{ name: 'Reset text welcome message', value: `\`${prefix}resettextwlc-msg\``, inline: true },
		)
		 .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
		 .setColor(colors.main)
		 message.channel.send(page1)
	}
}